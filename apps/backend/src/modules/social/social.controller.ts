import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { SocialService } from './social.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('social')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('social')
export class SocialController {
  constructor(private readonly socialService: SocialService) {}

  @Get('feed')
  @ApiOperation({ summary: 'Get social feed' })
  async getFeed(
    @CurrentUser('id') userId: string,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ) {
    return this.socialService.getFeed(userId, limit, offset);
  }

  @Post('posts')
  @ApiOperation({ summary: 'Create a post' })
  async createPost(@CurrentUser('id') userId: string, @Body() dto: any) {
    return this.socialService.createPost(userId, dto);
  }

  @Get('posts/:id')
  @ApiOperation({ summary: 'Get post by ID' })
  async getPost(@Param('id') id: string) {
    return this.socialService.getPost(id);
  }

  @Delete('posts/:id')
  @ApiOperation({ summary: 'Delete post' })
  async deletePost(@Param('id') id: string) {
    return this.socialService.deletePost(id);
  }

  @Post('posts/:id/like')
  @ApiOperation({ summary: 'Like a post' })
  async likePost(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return this.socialService.likePost(id, userId);
  }

  @Get('litter-groups')
  @ApiOperation({ summary: 'Get user litter groups' })
  async getLitterGroups(@CurrentUser('id') userId: string) {
    return this.socialService.getLitterGroups(userId);
  }

  @Post('litter-groups')
  @ApiOperation({ summary: 'Create litter group' })
  async createLitterGroup(@CurrentUser('id') userId: string, @Body() dto: any) {
    return this.socialService.createLitterGroup(userId, dto);
  }

  @Get('litter-groups/:id')
  @ApiOperation({ summary: 'Get litter group by ID' })
  async getLitterGroup(@Param('id') id: string) {
    return this.socialService.getLitterGroup(id);
  }

  @Post('litter-groups/:id/join')
  @ApiOperation({ summary: 'Join litter group' })
  async joinGroup(@Param('id') id: string, @Body('petId') petId: string) {
    return this.socialService.joinLitterGroup(id, petId);
  }

  @Post('litter-groups/:id/leave')
  @ApiOperation({ summary: 'Leave litter group' })
  async leaveGroup(@Param('id') id: string, @Body('petId') petId: string) {
    return this.socialService.leaveLitterGroup(id, petId);
  }

  @Get('litter-groups/join-by-code/:code')
  @ApiOperation({ summary: 'Join litter group by invite code' })
  async joinByCode(@Param('code') code: string, @Query('petId') petId: string) {
    return this.socialService.joinByCode(code, petId);
  }
}
