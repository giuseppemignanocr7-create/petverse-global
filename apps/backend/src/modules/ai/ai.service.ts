import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { PrismaService } from '../../database/prisma.service';
import { PetsService } from '../pets/pets.service';
import { HealthService } from '../health/health.service';

@Injectable()
export class AiService {
  private readonly openai: OpenAI;

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly petsService: PetsService,
    private readonly healthService: HealthService,
  ) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }

  async chat(userId: string, dto: { petId: string; message: string }) {
    const pet = await this.prisma.pet.findUnique({
      where: { id: dto.petId },
      include: {
        healthRecords: {
          where: {
            recordDate: {
              gte: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
            },
          },
          orderBy: { recordDate: 'desc' },
          take: 10,
        },
        vaccinations: { orderBy: { vaccinationDate: 'desc' }, take: 5 },
        feedingRecords: { orderBy: { recordDate: 'desc' }, take: 7 },
      },
    });

    if (!pet) throw new NotFoundException('Pet not found');

    const systemPrompt = this.buildSystemPrompt(pet);

    let conversation = await this.prisma.aiConversation.findFirst({
      where: { userId, petId: dto.petId },
      include: {
        messages: { orderBy: { createdAt: 'asc' }, take: 20 },
      },
    });

    if (!conversation) {
      conversation = await this.prisma.aiConversation.create({
        data: {
          userId,
          petId: dto.petId,
          conversationTitle: `Chat su ${pet.name}`,
        },
        include: { messages: true },
      });
    }

    const messages: any[] = [
      { role: 'system', content: systemPrompt },
      ...conversation.messages.map((m) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
      { role: 'user' as const, content: dto.message },
    ];

    const completion = await this.openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages,
      temperature: 0.7,
      max_tokens: 500,
      presence_penalty: 0.1,
      frequency_penalty: 0.1,
    });

    const aiResponse = completion.choices[0].message.content || '';
    const tokensUsed = completion.usage?.total_tokens || 0;

    await this.prisma.aiMessage.createMany({
      data: [
        {
          conversationId: conversation.id,
          role: 'user',
          content: dto.message,
        },
        {
          conversationId: conversation.id,
          role: 'assistant',
          content: aiResponse,
          metadata: {
            model: 'gpt-4-turbo',
            tokens: tokensUsed,
          },
        },
      ],
    });

    await this.prisma.aiConversation.update({
      where: { id: conversation.id },
      data: {
        lastMessageAt: new Date(),
        messageCount: { increment: 2 },
      },
    });

    return {
      message: aiResponse,
      suggestions: this.extractSuggestions(aiResponse),
      timestamp: new Date(),
    };
  }

  async getConversation(userId: string, petId: string) {
    const conversation = await this.prisma.aiConversation.findFirst({
      where: { userId, petId },
      include: {
        messages: { orderBy: { createdAt: 'asc' } },
      },
    });

    return conversation?.messages || [];
  }

  async triage(dto: { petId: string; symptoms: string[] }) {
    const pet = await this.prisma.pet.findUnique({
      where: { id: dto.petId },
    });

    if (!pet) throw new NotFoundException('Pet not found');

    const completion = await this.openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        {
          role: 'system',
          content: `Sei un sistema di triage veterinario. Analizza i sintomi e fornisci una valutazione.
IMPORTANTE: NON fare diagnosi. Classifica in: URGENTE (visita immediata), MONITORA (osserva 24-48h), NORMALE (nessuna preoccupazione).
Pet: ${pet.name}, Specie: ${pet.species}, Razza: ${pet.breed || 'misto'}`,
        },
        {
          role: 'user',
          content: `Sintomi riportati: ${dto.symptoms.join(', ')}`,
        },
      ],
      temperature: 0.3,
      max_tokens: 300,
    });

    return {
      assessment: completion.choices[0].message.content,
      disclaimer:
        'Questa valutazione NON sostituisce una visita veterinaria. In caso di dubbio, contatta sempre il tuo veterinario.',
      timestamp: new Date(),
    };
  }

  async getInsights(petId: string) {
    const pet = await this.prisma.pet.findUnique({
      where: { id: petId },
      include: {
        healthRecords: { orderBy: { recordDate: 'desc' }, take: 20 },
        vaccinations: true,
        feedingRecords: { orderBy: { recordDate: 'desc' }, take: 30 },
      },
    });

    if (!pet) throw new NotFoundException('Pet not found');

    const completion = await this.openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        {
          role: 'system',
          content: `Genera insight personalizzati per il pet. Rispondi in JSON con: { "insights": [{ "category": string, "title": string, "description": string, "priority": "high"|"medium"|"low" }] }`,
        },
        {
          role: 'user',
          content: `Pet: ${pet.name}, Specie: ${pet.species}, Razza: ${pet.breed}, Vaccini: ${pet.vaccinations.length}, Record salute: ${pet.healthRecords.length}`,
        },
      ],
      temperature: 0.5,
      max_tokens: 500,
      response_format: { type: 'json_object' },
    });

    try {
      return JSON.parse(completion.choices[0].message.content || '{}');
    } catch {
      return { insights: [] };
    }
  }

  private buildSystemPrompt(pet: any): string {
    const age = this.calculateAge(pet.birthdate, pet.estimatedAgeMonths);
    const recentHealth = (pet.healthRecords || []).slice(0, 3);
    const upcomingVaccines = (pet.vaccinations || []).filter(
      (v: any) => new Date(v.nextDueDate) > new Date(),
    );

    return `
Sei l'AI Coach empatico di PetVerse, un assistente veterinario virtuale.

**INFORMAZIONI PET:**
- Nome: ${pet.name}
- Specie: ${pet.species}
- Razza: ${pet.breed || 'misto'}
- Età: ${age}
- Sesso: ${pet.sex || 'non specificato'}
- Peso attuale: ${pet.weightKg?.[pet.weightKg.length - 1] || 'non registrato'} kg

**STORIA SANITARIA RECENTE:**
${recentHealth.map((h: any) => `- ${h.title} (${new Date(h.recordDate).toLocaleDateString('it-IT')})`).join('\n') || 'Nessun record recente'}

**VACCINI IN PROGRAMMA:**
${upcomingVaccines.map((v: any) => `- ${v.vaccineName} previsto per ${new Date(v.nextDueDate).toLocaleDateString('it-IT')}`).join('\n') || 'Nessun vaccino in programma'}

**REGOLE:**
1. Rispondi sempre in italiano
2. Tono caldo, empatico, rassicurante
3. Max 3-4 frasi per risposta
4. MAI fare diagnosi mediche
5. Per sintomi gravi: raccomanda SEMPRE visita veterinaria
6. Disclaimer quando appropriato
7. Fai domande di follow-up
8. Personalizza in base a specie, razza, età
`.trim();
  }

  private calculateAge(
    birthdate: Date | null,
    estimatedMonths: number | null,
  ): string {
    if (birthdate) {
      const months = Math.floor(
        (Date.now() - new Date(birthdate).getTime()) /
          (30 * 24 * 60 * 60 * 1000),
      );
      const years = Math.floor(months / 12);
      const rem = months % 12;
      if (years === 0) return `${months} mesi`;
      if (rem === 0) return `${years} anni`;
      return `${years} anni e ${rem} mesi`;
    }
    if (estimatedMonths) {
      const years = Math.floor(estimatedMonths / 12);
      const rem = estimatedMonths % 12;
      if (years === 0) return `circa ${estimatedMonths} mesi`;
      if (rem === 0) return `circa ${years} anni`;
      return `circa ${years} anni e ${rem} mesi`;
    }
    return 'età non specificata';
  }

  private extractSuggestions(response: string): string[] {
    const suggestions: string[] = [];
    if (/vaccin/i.test(response))
      suggestions.push('Quando è il prossimo vaccino?');
    if (/alimenta|cibo|mangia/i.test(response))
      suggestions.push('Consigli su alimentazione?');
    if (/comportamento|addestramento/i.test(response))
      suggestions.push('Come migliorare il comportamento?');
    if (/peso/i.test(response)) suggestions.push('Il peso è nella norma?');
    return suggestions.slice(0, 3);
  }
}
