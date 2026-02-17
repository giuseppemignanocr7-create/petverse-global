import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { PetsModule } from '../pets/pets.module';
import { HealthModule } from '../health/health.module';

@Module({
  imports: [PetsModule, HealthModule],
  controllers: [AiController],
  providers: [AiService],
  exports: [AiService],
})
export class AiModule {}
