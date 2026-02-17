import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SocialService {
  constructor(private readonly prisma: PrismaService) {}

  async getFeed(userId: string, limit = 20, offset = 0) {
    return this.prisma.litterPost.findMany({
      where: {
        litterGroup: {
          members: { some: { pet: { ownerId: userId } } },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
      include: { author: { select: { id: true, fullName: true, avatarUrl: true } } },
    });
  }

  async createPost(userId: string, dto: any) {
    return this.prisma.litterPost.create({
      data: {
        litterGroupId: dto.litterGroupId,
        authorId: userId,
        petId: dto.petId,
        content: dto.content,
        media: dto.media,
      },
    });
  }

  async getPost(id: string) {
    const post = await this.prisma.litterPost.findUnique({
      where: { id },
      include: { author: { select: { id: true, fullName: true, avatarUrl: true } } },
    });
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  async deletePost(id: string) {
    return this.prisma.litterPost.delete({ where: { id } });
  }

  async likePost(id: string, userId: string) {
    const post = await this.prisma.litterPost.findUnique({ where: { id } });
    if (!post) throw new NotFoundException('Post not found');
    const reactions = (post.reactions as any) || {};
    reactions.likes = (reactions.likes || 0) + 1;
    return this.prisma.litterPost.update({ where: { id }, data: { reactions } });
  }

  // --- Litter Groups ---

  async getLitterGroups(userId: string) {
    return this.prisma.litterGroup.findMany({
      where: { members: { some: { pet: { ownerId: userId } } } },
      include: { members: { include: { pet: true } } },
    });
  }

  async createLitterGroup(userId: string, dto: any) {
    const inviteCode = uuidv4().slice(0, 8).toUpperCase();
    return this.prisma.litterGroup.create({
      data: {
        name: dto.name,
        description: dto.description,
        birthDate: dto.birthDate ? new Date(dto.birthDate) : undefined,
        breed: dto.breed,
        breederName: dto.breederName,
        breederContact: dto.breederContact,
        privacy: dto.privacy || 'private',
        inviteCode,
        createdById: userId,
      },
    });
  }

  async getLitterGroup(id: string) {
    const group = await this.prisma.litterGroup.findUnique({
      where: { id },
      include: { members: { include: { pet: true } }, posts: { take: 20, orderBy: { createdAt: 'desc' } } },
    });
    if (!group) throw new NotFoundException('Litter group not found');
    return group;
  }

  async joinLitterGroup(groupId: string, petId: string) {
    const member = await this.prisma.litterMember.create({
      data: { litterGroupId: groupId, petId },
    });
    await this.prisma.litterGroup.update({
      where: { id: groupId },
      data: { memberCount: { increment: 1 } },
    });
    return member;
  }

  async leaveLitterGroup(groupId: string, petId: string) {
    await this.prisma.litterMember.deleteMany({
      where: { litterGroupId: groupId, petId },
    });
    await this.prisma.litterGroup.update({
      where: { id: groupId },
      data: { memberCount: { decrement: 1 } },
    });
    return { message: 'Left group successfully' };
  }

  async joinByCode(code: string, petId: string) {
    const group = await this.prisma.litterGroup.findUnique({
      where: { inviteCode: code },
    });
    if (!group) throw new NotFoundException('Invalid invite code');
    return this.joinLitterGroup(group.id, petId);
  }
}
