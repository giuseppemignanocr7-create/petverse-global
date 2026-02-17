import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class NewsService {
  constructor(private readonly prisma: PrismaService) {}

  async getArticles(filters?: {
    category?: string;
    species?: string;
    search?: string;
    limit?: number;
    offset?: number;
  }) {
    const where: any = { isPublished: true };
    if (filters?.category) where.category = filters.category;
    if (filters?.species) where.speciesTags = { has: filters.species };
    if (filters?.search) {
      where.OR = [
        { title: { contains: filters.search, mode: 'insensitive' } },
        { excerpt: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    return this.prisma.newsArticle.findMany({
      where,
      orderBy: { publishedAt: 'desc' },
      take: filters?.limit || 20,
      skip: filters?.offset || 0,
    });
  }

  async getArticle(id: string) {
    const article = await this.prisma.newsArticle.findUnique({ where: { id } });
    if (!article) throw new NotFoundException('Article not found');
    return article;
  }

  async trackView(id: string) {
    return this.prisma.newsArticle.update({
      where: { id },
      data: { viewsCount: { increment: 1 } },
    });
  }

  async getCategories() {
    const categories = await this.prisma.newsArticle.groupBy({
      by: ['category'],
      where: { isPublished: true },
      _count: { id: true },
    });
    return categories.map((c) => ({ name: c.category, count: c._count.id }));
  }
}
