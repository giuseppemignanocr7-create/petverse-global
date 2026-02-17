import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreatePetDto, UpdatePetDto } from './dto/create-pet.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PetsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllByUserId(userId: string) {
    return this.prisma.pet.findMany({
      where: {
        OR: [
          { ownerId: userId },
          {
            collaborators: {
              some: {
                userId,
                acceptedAt: { not: null },
              },
            },
          },
        ],
        status: 'active',
      },
      include: {
        vaccinations: {
          where: { nextDueDate: { gte: new Date() } },
          orderBy: { nextDueDate: 'asc' },
          take: 1,
        },
        appointments: {
          where: {
            status: 'scheduled',
            appointmentDate: { gte: new Date() },
          },
          orderBy: { appointmentDate: 'asc' },
          take: 1,
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(petId: string) {
    const pet = await this.prisma.pet.findUnique({
      where: { id: petId },
      include: {
        collaborators: true,
        vaccinations: {
          orderBy: { vaccinationDate: 'desc' },
          take: 5,
        },
        appointments: {
          where: { status: 'scheduled' },
          orderBy: { appointmentDate: 'asc' },
          take: 5,
        },
      },
    });

    if (!pet || pet.status !== 'active') {
      throw new NotFoundException('Pet not found');
    }

    return pet;
  }

  async create(userId: string, dto: CreatePetDto) {
    return this.prisma.pet.create({
      data: {
        ownerId: userId,
        name: dto.name,
        species: dto.species,
        breed: dto.breed,
        breedCategory: dto.breedCategory,
        sex: dto.sex,
        birthdate: dto.birthdate ? new Date(dto.birthdate) : undefined,
        estimatedAgeMonths: dto.estimatedAgeMonths,
        microchipNumber: dto.microchipNumber,
        pedigreeNumber: dto.pedigreeNumber,
        weightKg: dto.initialWeight ? [dto.initialWeight] : [],
        weightRecordedAt: dto.initialWeight ? [new Date()] : [],
        heightCm: dto.heightCm,
        coatColor: dto.coatColor,
        coatType: dto.coatType,
        distinctiveMarks: dto.distinctiveMarks,
        insuranceProvider: dto.insuranceProvider,
        insurancePolicyNumber: dto.insurancePolicyNumber,
        insuranceExpiry: dto.insuranceExpiry
          ? new Date(dto.insuranceExpiry)
          : undefined,
      },
    });
  }

  async update(petId: string, userId: string, dto: UpdatePetDto) {
    await this.checkAccess(petId, userId);

    const data: any = { ...dto };
    if (dto.birthdate) data.birthdate = new Date(dto.birthdate);
    delete data.avatar;

    return this.prisma.pet.update({
      where: { id: petId },
      data,
    });
  }

  async delete(petId: string, userId: string) {
    await this.checkOwnership(petId, userId);

    return this.prisma.pet.update({
      where: { id: petId },
      data: { status: 'deleted' },
    });
  }

  async updateAvatar(petId: string, userId: string, avatarUrl: string) {
    await this.checkAccess(petId, userId);

    return this.prisma.pet.update({
      where: { id: petId },
      data: { avatarUrl },
    });
  }

  async addWeightRecord(petId: string, userId: string, weight: number) {
    await this.checkAccess(petId, userId);

    const pet = await this.prisma.pet.findUnique({
      where: { id: petId },
      select: { weightKg: true, weightRecordedAt: true },
    });

    return this.prisma.pet.update({
      where: { id: petId },
      data: {
        weightKg: { push: weight },
        weightRecordedAt: { push: new Date() },
      },
    });
  }

  async getStatistics(petId: string, userId: string) {
    await this.checkAccess(petId, userId);

    const pet = await this.prisma.pet.findUnique({
      where: { id: petId },
      select: {
        weightKg: true,
        weightRecordedAt: true,
        _count: {
          select: {
            healthRecords: true,
            vaccinations: true,
            appointments: true,
            diaryEntries: true,
          },
        },
      },
    });

    return {
      weightHistory: pet?.weightKg.map((w, i) => ({
        weight: w,
        date: pet.weightRecordedAt[i],
      })),
      counts: pet?._count,
    };
  }

  async getCollaborators(petId: string, userId: string) {
    await this.checkAccess(petId, userId);

    return this.prisma.petCollaborator.findMany({
      where: { petId },
    });
  }

  async addCollaborator(
    petId: string,
    userId: string,
    collaboratorUserId: string,
    role: string,
  ) {
    await this.checkOwnership(petId, userId);

    return this.prisma.petCollaborator.create({
      data: {
        petId,
        userId: collaboratorUserId,
        role,
        invitedBy: userId,
      },
    });
  }

  async removeCollaborator(
    petId: string,
    userId: string,
    collaboratorUserId: string,
  ) {
    await this.checkOwnership(petId, userId);

    return this.prisma.petCollaborator.deleteMany({
      where: { petId, userId: collaboratorUserId },
    });
  }

  private async checkAccess(petId: string, userId: string) {
    const pet = await this.prisma.pet.findFirst({
      where: {
        id: petId,
        OR: [
          { ownerId: userId },
          {
            collaborators: {
              some: { userId, acceptedAt: { not: null } },
            },
          },
        ],
      },
    });

    if (!pet) {
      throw new ForbiddenException('Access denied');
    }
  }

  private async checkOwnership(petId: string, userId: string) {
    const pet = await this.prisma.pet.findFirst({
      where: { id: petId, ownerId: userId },
    });

    if (!pet) {
      throw new ForbiddenException('Only the owner can perform this action');
    }
  }
}
