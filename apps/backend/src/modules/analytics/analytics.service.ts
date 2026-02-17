import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private readonly prisma: PrismaService) {}

  async trackEvent(
    eventName: string,
    userId?: string,
    properties?: any,
    deviceInfo?: any,
    sessionId?: string,
  ) {
    return this.prisma.analyticsEvent.create({
      data: {
        eventName,
        userId,
        eventProperties: properties,
        deviceInfo,
        sessionId,
      },
    });
  }

  async getEventCounts(eventName: string, startDate: Date, endDate: Date) {
    return this.prisma.analyticsEvent.count({
      where: {
        eventName,
        createdAt: { gte: startDate, lte: endDate },
      },
    });
  }

  async getActiveUsers(startDate: Date, endDate: Date) {
    const events = await this.prisma.analyticsEvent.groupBy({
      by: ['userId'],
      where: {
        createdAt: { gte: startDate, lte: endDate },
        userId: { not: null },
      },
    });
    return { count: events.length };
  }
}
