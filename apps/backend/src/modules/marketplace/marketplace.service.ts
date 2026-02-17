import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MarketplaceService {
  constructor(private readonly prisma: PrismaService) {}

  async getProducts(filters?: {
    category?: string;
    species?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
    limit?: number;
    offset?: number;
    sortBy?: string;
  }) {
    const where: any = { isActive: true };
    if (filters?.category) where.category = filters.category;
    if (filters?.species)
      where.speciesCompatibility = { has: filters.species };
    if (filters?.minPrice || filters?.maxPrice) {
      where.price = {};
      if (filters?.minPrice) where.price.gte = filters.minPrice;
      if (filters?.maxPrice) where.price.lte = filters.maxPrice;
    }
    if (filters?.search) {
      where.OR = [
        { name: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    const orderBy: any = {};
    switch (filters?.sortBy) {
      case 'price_asc':
        orderBy.price = 'asc';
        break;
      case 'price_desc':
        orderBy.price = 'desc';
        break;
      case 'rating':
        orderBy.rating = 'desc';
        break;
      default:
        orderBy.createdAt = 'desc';
    }

    return this.prisma.marketplaceProduct.findMany({
      where,
      orderBy,
      take: filters?.limit || 20,
      skip: filters?.offset || 0,
    });
  }

  async getProduct(id: string) {
    const product = await this.prisma.marketplaceProduct.findUnique({
      where: { id },
    });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async getCategories() {
    const categories = await this.prisma.marketplaceProduct.groupBy({
      by: ['category'],
      where: { isActive: true },
      _count: { id: true },
    });
    return categories.map((c) => ({
      name: c.category,
      count: c._count.id,
    }));
  }

  async getRecommendations(petId: string) {
    const pet = await this.prisma.pet.findUnique({
      where: { id: petId },
      select: { species: true, breed: true },
    });
    if (!pet) throw new NotFoundException('Pet not found');

    return this.prisma.marketplaceProduct.findMany({
      where: {
        isActive: true,
        OR: [
          { speciesCompatibility: { has: pet.species } },
          { breedRecommendations: { has: pet.breed || '' } },
        ],
      },
      orderBy: { rating: 'desc' },
      take: 10,
    });
  }

  // --- Cart (stored in-memory/Redis in production, simplified here) ---

  async getCart(userId: string) {
    // In production: use Redis for cart storage
    return { userId, items: [], total: 0 };
  }

  async addToCart(userId: string, productId: string, quantity: number) {
    return { userId, productId, quantity, message: 'Added to cart' };
  }

  // --- Orders ---

  async createOrder(userId: string, dto: any) {
    const orderNumber = `PV-${Date.now()}-${uuidv4().slice(0, 4).toUpperCase()}`;

    return this.prisma.order.create({
      data: {
        userId,
        orderNumber,
        status: 'pending',
        items: dto.items,
        subtotal: dto.subtotal,
        shippingCost: dto.shippingCost || 0,
        tax: dto.tax || 0,
        total: dto.total,
        shippingAddress: dto.shippingAddress,
        stripePaymentIntentId: dto.stripePaymentIntentId,
      },
    });
  }

  async getOrders(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getOrder(id: string) {
    const order = await this.prisma.order.findUnique({ where: { id } });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }
}
