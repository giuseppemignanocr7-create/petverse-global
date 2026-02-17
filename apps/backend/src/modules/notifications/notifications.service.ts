import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  async sendPushNotification(
    userId: string,
    title: string,
    body: string,
    data?: any,
  ) {
    // In production: use Firebase Cloud Messaging
    const log = await this.prisma.notificationLog.create({
      data: {
        userId,
        notificationType: 'push',
        title,
        body,
        data,
        sentAt: new Date(),
      },
    });

    return log;
  }

  async sendEmailNotification(
    userId: string,
    title: string,
    body: string,
  ) {
    // In production: use @nestjs-modules/mailer
    const log = await this.prisma.notificationLog.create({
      data: {
        userId,
        notificationType: 'email',
        title,
        body,
        sentAt: new Date(),
      },
    });

    return log;
  }

  async getNotificationHistory(userId: string, limit = 50) {
    return this.prisma.notificationLog.findMany({
      where: { userId },
      orderBy: { sentAt: 'desc' },
      take: limit,
    });
  }

  async markAsDelivered(notificationId: string) {
    return this.prisma.notificationLog.update({
      where: { id: notificationId },
      data: { deliveredAt: new Date() },
    });
  }

  async markAsOpened(notificationId: string) {
    return this.prisma.notificationLog.update({
      where: { id: notificationId },
      data: { openedAt: new Date() },
    });
  }
}
