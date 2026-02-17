import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class DiaryService {
  constructor(private readonly prisma: PrismaService) {}

  async getEntries(petId: string, filters?: { type?: string; limit?: number; offset?: number }) {
    return this.prisma.diaryEntry.findMany({
      where: {
        petId,
        ...(filters?.type ? { entryType: filters.type } : {}),
      },
      orderBy: { entryDate: 'desc' },
      take: filters?.limit || 20,
      skip: filters?.offset || 0,
      include: { comments: { take: 3, orderBy: { createdAt: 'desc' } } },
    });
  }

  async createEntry(petId: string, userId: string, dto: any) {
    return this.prisma.diaryEntry.create({
      data: {
        petId,
        userId,
        entryType: dto.entryType,
        entryDate: new Date(dto.entryDate || Date.now()),
        title: dto.title,
        content: dto.content,
        media: dto.media,
        mood: dto.mood,
        tags: dto.tags || [],
        visibility: dto.visibility || 'private',
      },
    });
  }

  async getEntry(id: string) {
    const entry = await this.prisma.diaryEntry.findUnique({
      where: { id },
      include: { comments: { orderBy: { createdAt: 'asc' } } },
    });
    if (!entry) throw new NotFoundException('Diary entry not found');
    return entry;
  }

  async updateEntry(id: string, dto: any) {
    return this.prisma.diaryEntry.update({
      where: { id },
      data: {
        entryType: dto.entryType,
        entryDate: dto.entryDate ? new Date(dto.entryDate) : undefined,
        title: dto.title,
        content: dto.content,
        media: dto.media,
        mood: dto.mood,
        tags: dto.tags,
        visibility: dto.visibility,
      },
    });
  }

  async deleteEntry(id: string) {
    return this.prisma.diaryEntry.delete({ where: { id } });
  }

  async addReaction(id: string, reactionType: string, userId: string) {
    const entry = await this.prisma.diaryEntry.findUnique({ where: { id } });
    if (!entry) throw new NotFoundException('Diary entry not found');

    const reactions = (entry.reactions as any) || {};
    reactions[reactionType] = (reactions[reactionType] || 0) + 1;

    return this.prisma.diaryEntry.update({
      where: { id },
      data: { reactions },
    });
  }

  async getComments(entryId: string) {
    return this.prisma.diaryComment.findMany({
      where: { diaryEntryId: entryId },
      orderBy: { createdAt: 'asc' },
    });
  }

  async addComment(entryId: string, authorId: string, content: string) {
    const comment = await this.prisma.diaryComment.create({
      data: { diaryEntryId: entryId, authorId, content },
    });

    await this.prisma.diaryEntry.update({
      where: { id: entryId },
      data: { commentCount: { increment: 1 } },
    });

    return comment;
  }

  async deleteComment(commentId: string) {
    const comment = await this.prisma.diaryComment.findUnique({
      where: { id: commentId },
    });
    if (!comment) throw new NotFoundException('Comment not found');

    await this.prisma.diaryComment.delete({ where: { id: commentId } });

    await this.prisma.diaryEntry.update({
      where: { id: comment.diaryEntryId },
      data: { commentCount: { decrement: 1 } },
    });

    return { message: 'Comment deleted' };
  }

  // --- Milestones ---

  async getMilestones(petId: string) {
    return this.prisma.milestone.findMany({
      where: { petId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createMilestone(petId: string, dto: any) {
    return this.prisma.milestone.create({
      data: {
        petId,
        milestoneType: dto.milestoneType,
        title: dto.title,
        description: dto.description,
        achievedAt: dto.achievedAt ? new Date(dto.achievedAt) : null,
        isCustom: dto.isCustom || false,
      },
    });
  }

  async updateMilestone(id: string, dto: any) {
    return this.prisma.milestone.update({
      where: { id },
      data: {
        title: dto.title,
        description: dto.description,
        achievedAt: dto.achievedAt ? new Date(dto.achievedAt) : undefined,
      },
    });
  }
}
