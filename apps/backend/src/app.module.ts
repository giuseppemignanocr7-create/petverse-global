import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PetsModule } from './modules/pets/pets.module';
import { HealthModule } from './modules/health/health.module';
import { DiaryModule } from './modules/diary/diary.module';
import { AiModule } from './modules/ai/ai.module';
import { SocialModule } from './modules/social/social.module';
import { MarketplaceModule } from './modules/marketplace/marketplace.module';
import { NewsModule } from './modules/news/news.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { StorageModule } from './modules/storage/storage.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env${process.env.NODE_ENV === 'test' ? '.test' : ''}`,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),
    DatabaseModule,
    AuthModule,
    UsersModule,
    PetsModule,
    HealthModule,
    DiaryModule,
    AiModule,
    SocialModule,
    MarketplaceModule,
    NewsModule,
    NotificationsModule,
    PaymentsModule,
    StorageModule,
    AnalyticsModule,
  ],
})
export class AppModule {}
