import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AiService } from './ai.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('ai')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Get('conversations/:petId')
  @ApiOperation({ summary: 'Get AI conversation for a pet' })
  async getConversation(
    @CurrentUser('id') userId: string,
    @Param('petId') petId: string,
  ) {
    return this.aiService.getConversation(userId, petId);
  }

  @Post('chat')
  @ApiOperation({ summary: 'Send message to AI Coach' })
  async chat(
    @CurrentUser('id') userId: string,
    @Body() dto: { petId: string; message: string },
  ) {
    return this.aiService.chat(userId, dto);
  }

  @Post('triage')
  @ApiOperation({ summary: 'AI health triage' })
  async triage(@Body() dto: { petId: string; symptoms: string[] }) {
    return this.aiService.triage(dto);
  }

  @Get('insights/:petId')
  @ApiOperation({ summary: 'Get AI insights for a pet' })
  async getInsights(@Param('petId') petId: string) {
    return this.aiService.getInsights(petId);
  }
}
