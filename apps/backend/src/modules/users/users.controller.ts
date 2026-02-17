import {
  Controller,
  Get,
  Put,
  Delete,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get current user profile' })
  async getMe(@CurrentUser('id') userId: string) {
    return this.usersService.findById(userId);
  }

  @Put('me')
  @ApiOperation({ summary: 'Update current user profile' })
  async updateMe(
    @CurrentUser('id') userId: string,
    @Body() dto: UpdateUserDto,
  ) {
    return this.usersService.update(userId, dto);
  }

  @Delete('me')
  @ApiOperation({ summary: 'Delete current user account' })
  async deleteMe(@CurrentUser('id') userId: string) {
    return this.usersService.deleteAccount(userId);
  }

  @Put('me/avatar')
  @ApiOperation({ summary: 'Update user avatar' })
  async updateAvatar(
    @CurrentUser('id') userId: string,
    @Body('avatarUrl') avatarUrl: string,
  ) {
    return this.usersService.updateAvatar(userId, avatarUrl);
  }

  @Get('me/settings')
  @ApiOperation({ summary: 'Get user settings' })
  async getSettings(@CurrentUser('id') userId: string) {
    return this.usersService.getSettings(userId);
  }

  @Put('me/settings')
  @ApiOperation({ summary: 'Update user settings' })
  async updateSettings(
    @CurrentUser('id') userId: string,
    @Body() settings: any,
  ) {
    return this.usersService.updateSettings(userId, settings);
  }

  @Get('me/export')
  @ApiOperation({ summary: 'Export user data (GDPR)' })
  async exportData(@CurrentUser('id') userId: string) {
    return this.usersService.exportUserData(userId);
  }
}
