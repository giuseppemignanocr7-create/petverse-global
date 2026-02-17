import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { DiaryService } from './diary.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('diary')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('diary')
export class DiaryController {
  constructor(private readonly diaryService: DiaryService) {}

  @Get('pets/:petId/entries')
  @ApiOperation({ summary: 'Get diary entries for a pet' })
  async getEntries(
    @Param('petId') petId: string,
    @Query('type') type?: string,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ) {
    return this.diaryService.getEntries(petId, { type, limit, offset });
  }

  @Post('pets/:petId/entries')
  @ApiOperation({ summary: 'Create diary entry' })
  async createEntry(
    @Param('petId') petId: string,
    @CurrentUser('id') userId: string,
    @Body() dto: any,
  ) {
    return this.diaryService.createEntry(petId, userId, dto);
  }

  @Get('entries/:id')
  @ApiOperation({ summary: 'Get diary entry by ID' })
  async getEntry(@Param('id') id: string) {
    return this.diaryService.getEntry(id);
  }

  @Put('entries/:id')
  @ApiOperation({ summary: 'Update diary entry' })
  async updateEntry(@Param('id') id: string, @Body() dto: any) {
    return this.diaryService.updateEntry(id, dto);
  }

  @Delete('entries/:id')
  @ApiOperation({ summary: 'Delete diary entry' })
  async deleteEntry(@Param('id') id: string) {
    return this.diaryService.deleteEntry(id);
  }

  @Post('entries/:id/reactions')
  @ApiOperation({ summary: 'Add reaction to diary entry' })
  async addReaction(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
    @Body('type') reactionType: string,
  ) {
    return this.diaryService.addReaction(id, reactionType, userId);
  }

  @Get('entries/:id/comments')
  @ApiOperation({ summary: 'Get comments for diary entry' })
  async getComments(@Param('id') id: string) {
    return this.diaryService.getComments(id);
  }

  @Post('entries/:id/comments')
  @ApiOperation({ summary: 'Add comment to diary entry' })
  async addComment(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
    @Body('content') content: string,
  ) {
    return this.diaryService.addComment(id, userId, content);
  }

  @Delete('comments/:id')
  @ApiOperation({ summary: 'Delete comment' })
  async deleteComment(@Param('id') id: string) {
    return this.diaryService.deleteComment(id);
  }

  @Get('pets/:petId/milestones')
  @ApiOperation({ summary: 'Get milestones for a pet' })
  async getMilestones(@Param('petId') petId: string) {
    return this.diaryService.getMilestones(petId);
  }

  @Post('pets/:petId/milestones')
  @ApiOperation({ summary: 'Create milestone' })
  async createMilestone(@Param('petId') petId: string, @Body() dto: any) {
    return this.diaryService.createMilestone(petId, dto);
  }

  @Put('milestones/:id')
  @ApiOperation({ summary: 'Update milestone' })
  async updateMilestone(@Param('id') id: string, @Body() dto: any) {
    return this.diaryService.updateMilestone(id, dto);
  }
}
