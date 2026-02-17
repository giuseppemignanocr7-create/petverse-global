import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { PetsService } from './pets.service';
import { CreatePetDto, UpdatePetDto } from './dto/create-pet.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('pets')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all pets for current user' })
  async findAll(@CurrentUser('id') userId: string) {
    return this.petsService.findAllByUserId(userId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new pet' })
  async create(
    @CurrentUser('id') userId: string,
    @Body() dto: CreatePetDto,
  ) {
    return this.petsService.create(userId, dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get pet by ID' })
  async findOne(@Param('id') id: string) {
    return this.petsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update pet' })
  async update(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
    @Body() dto: UpdatePetDto,
  ) {
    return this.petsService.update(id, userId, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete pet' })
  async delete(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.petsService.delete(id, userId);
  }

  @Put(':id/avatar')
  @ApiOperation({ summary: 'Update pet avatar' })
  async updateAvatar(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
    @Body('avatarUrl') avatarUrl: string,
  ) {
    return this.petsService.updateAvatar(id, userId, avatarUrl);
  }

  @Get(':id/statistics')
  @ApiOperation({ summary: 'Get pet statistics' })
  async getStatistics(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.petsService.getStatistics(id, userId);
  }

  @Get(':id/collaborators')
  @ApiOperation({ summary: 'Get pet collaborators' })
  async getCollaborators(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.petsService.getCollaborators(id, userId);
  }

  @Post(':id/collaborators')
  @ApiOperation({ summary: 'Add collaborator to pet' })
  async addCollaborator(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
    @Body('userId') collaboratorUserId: string,
    @Body('role') role: string,
  ) {
    return this.petsService.addCollaborator(id, userId, collaboratorUserId, role);
  }

  @Delete(':id/collaborators/:userId')
  @ApiOperation({ summary: 'Remove collaborator from pet' })
  async removeCollaborator(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
    @Param('userId') collaboratorUserId: string,
  ) {
    return this.petsService.removeCollaborator(id, userId, collaboratorUserId);
  }
}
