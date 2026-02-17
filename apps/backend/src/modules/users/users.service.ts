import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user || user.deletedAt) {
      throw new NotFoundException('User not found');
    }

    const { passwordHash, ...sanitized } = user;
    return sanitized;
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });
  }

  async update(userId: string, dto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updated = await this.prisma.user.update({
      where: { id: userId },
      data: {
        fullName: dto.fullName,
        phone: dto.phone,
        address: dto.address as any,
        dateOfBirth: dto.dateOfBirth ? new Date(dto.dateOfBirth) : undefined,
      },
    });

    const { passwordHash, ...sanitized } = updated;
    return sanitized;
  }

  async updateAvatar(userId: string, avatarUrl: string) {
    const updated = await this.prisma.user.update({
      where: { id: userId },
      data: { avatarUrl },
    });

    const { passwordHash, ...sanitized } = updated;
    return sanitized;
  }

  async getSettings(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { preferences: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user.preferences || {
      notifications: {
        push: true,
        email: true,
        vaccineReminders: true,
        appointmentReminders: true,
        medicationReminders: true,
        communityUpdates: true,
        marketplaceDeals: false,
      },
      privacy: {
        profileVisibility: 'private',
        showPetsInCommunity: false,
      },
      language: 'it',
      theme: 'system',
    };
  }

  async updateSettings(userId: string, settings: any) {
    const updated = await this.prisma.user.update({
      where: { id: userId },
      data: { preferences: settings },
    });

    return updated.preferences;
  }

  async deleteAccount(userId: string) {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        deletedAt: new Date(),
        email: `deleted_${userId}@petverse.app`,
        fullName: 'Deleted User',
        avatarUrl: null,
        phone: null,
        address: Prisma.DbNull,
      },
    });

    return { message: 'Account scheduled for deletion' };
  }

  async exportUserData(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        pets: {
          include: {
            healthRecords: true,
            vaccinations: true,
            diaryEntries: true,
            appointments: true,
            medications: true,
          },
        },
        subscriptions: true,
        orders: true,
        aiConversations: {
          include: { messages: true },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { passwordHash, ...data } = user;

    return {
      exportDate: new Date().toISOString(),
      format: 'JSON',
      data,
    };
  }
}
