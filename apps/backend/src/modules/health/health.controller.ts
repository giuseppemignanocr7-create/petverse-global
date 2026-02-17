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
import { HealthService } from './health.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('health')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  // --- Vaccinations ---

  @Get('pets/:petId/vaccinations')
  @ApiOperation({ summary: 'Get vaccinations for a pet' })
  async getVaccinations(@Param('petId') petId: string) {
    return this.healthService.getVaccinations(petId);
  }

  @Post('pets/:petId/vaccinations')
  @ApiOperation({ summary: 'Add vaccination' })
  async addVaccination(
    @Param('petId') petId: string,
    @CurrentUser('id') userId: string,
    @Body() dto: any,
  ) {
    return this.healthService.addVaccination(petId, userId, dto);
  }

  @Get('vaccinations/:id')
  @ApiOperation({ summary: 'Get vaccination by ID' })
  async getVaccination(@Param('id') id: string) {
    return this.healthService.getVaccination(id);
  }

  @Put('vaccinations/:id')
  @ApiOperation({ summary: 'Update vaccination' })
  async updateVaccination(@Param('id') id: string, @Body() dto: any) {
    return this.healthService.updateVaccination(id, dto);
  }

  @Delete('vaccinations/:id')
  @ApiOperation({ summary: 'Delete vaccination' })
  async deleteVaccination(@Param('id') id: string) {
    return this.healthService.deleteVaccination(id);
  }

  // --- Health Records ---

  @Get('pets/:petId/records')
  @ApiOperation({ summary: 'Get health records for a pet' })
  async getRecords(@Param('petId') petId: string) {
    return this.healthService.getRecords(petId);
  }

  @Post('pets/:petId/records')
  @ApiOperation({ summary: 'Add health record' })
  async addRecord(
    @Param('petId') petId: string,
    @CurrentUser('id') userId: string,
    @Body() dto: any,
  ) {
    return this.healthService.addRecord(petId, userId, dto);
  }

  @Get('records/:id')
  @ApiOperation({ summary: 'Get health record by ID' })
  async getRecord(@Param('id') id: string) {
    return this.healthService.getRecord(id);
  }

  @Put('records/:id')
  @ApiOperation({ summary: 'Update health record' })
  async updateRecord(@Param('id') id: string, @Body() dto: any) {
    return this.healthService.updateRecord(id, dto);
  }

  @Delete('records/:id')
  @ApiOperation({ summary: 'Delete health record' })
  async deleteRecord(@Param('id') id: string) {
    return this.healthService.deleteRecord(id);
  }

  // --- Appointments ---

  @Get('pets/:petId/appointments')
  @ApiOperation({ summary: 'Get appointments for a pet' })
  async getAppointments(@Param('petId') petId: string) {
    return this.healthService.getAppointments(petId);
  }

  @Post('pets/:petId/appointments')
  @ApiOperation({ summary: 'Add appointment' })
  async addAppointment(@Param('petId') petId: string, @Body() dto: any) {
    return this.healthService.addAppointment(petId, dto);
  }

  @Put('appointments/:id')
  @ApiOperation({ summary: 'Update appointment' })
  async updateAppointment(@Param('id') id: string, @Body() dto: any) {
    return this.healthService.updateAppointment(id, dto);
  }

  @Delete('appointments/:id')
  @ApiOperation({ summary: 'Delete appointment' })
  async deleteAppointment(@Param('id') id: string) {
    return this.healthService.deleteAppointment(id);
  }

  // --- Medications ---

  @Get('pets/:petId/medications')
  @ApiOperation({ summary: 'Get medications for a pet' })
  async getMedications(@Param('petId') petId: string) {
    return this.healthService.getMedications(petId);
  }

  @Post('pets/:petId/medications')
  @ApiOperation({ summary: 'Add medication' })
  async addMedication(@Param('petId') petId: string, @Body() dto: any) {
    return this.healthService.addMedication(petId, dto);
  }

  @Put('medications/:id')
  @ApiOperation({ summary: 'Update medication' })
  async updateMedication(@Param('id') id: string, @Body() dto: any) {
    return this.healthService.updateMedication(id, dto);
  }

  @Delete('medications/:id')
  @ApiOperation({ summary: 'Delete medication' })
  async deleteMedication(@Param('id') id: string) {
    return this.healthService.deleteMedication(id);
  }

  @Post('medications/:id/doses')
  @ApiOperation({ summary: 'Log medication dose' })
  async logDose(@Param('id') id: string, @Body() dto: any) {
    return this.healthService.logMedicationDose(id, dto);
  }

  // --- VetBridge ---

  @Post('vetbridge/generate-qr/:petId')
  @ApiOperation({ summary: 'Generate VetBridge QR code' })
  async generateQr(
    @Param('petId') petId: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.healthService.generateVetBridgeQr(petId, userId);
  }

  @Get('vetbridge/shared-records/:petId')
  @ApiOperation({ summary: 'Get shared records' })
  async getSharedRecords(@Param('petId') petId: string) {
    return this.healthService.getSharedRecords(petId);
  }

  @Delete('vetbridge/revoke/:shareId')
  @ApiOperation({ summary: 'Revoke VetBridge share' })
  async revokeShare(@Param('shareId') shareId: string) {
    return this.healthService.revokeShare(shareId);
  }
}
