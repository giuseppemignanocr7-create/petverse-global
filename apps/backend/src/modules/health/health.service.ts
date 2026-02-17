import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class HealthService {
  constructor(private readonly prisma: PrismaService) {}

  // --- Vaccinations ---

  async getVaccinations(petId: string) {
    return this.prisma.vaccination.findMany({
      where: { petId },
      orderBy: { vaccinationDate: 'desc' },
      include: { clinic: true },
    });
  }

  async addVaccination(petId: string, userId: string, dto: any) {
    return this.prisma.vaccination.create({
      data: {
        petId,
        vaccineName: dto.vaccineName,
        vaccineType: dto.vaccineType,
        batchNumber: dto.batchNumber,
        vaccinationDate: new Date(dto.vaccinationDate),
        expiryDate: dto.expiryDate ? new Date(dto.expiryDate) : undefined,
        nextDueDate: dto.nextDueDate
          ? new Date(dto.nextDueDate)
          : new Date(
              new Date(dto.vaccinationDate).getTime() +
                365 * 24 * 60 * 60 * 1000,
            ),
        administeredBy: dto.administeredBy,
        clinicId: dto.clinicId,
      },
    });
  }

  async getVaccination(id: string) {
    const vaccination = await this.prisma.vaccination.findUnique({
      where: { id },
      include: { clinic: true },
    });
    if (!vaccination) throw new NotFoundException('Vaccination not found');
    return vaccination;
  }

  async updateVaccination(id: string, dto: any) {
    return this.prisma.vaccination.update({
      where: { id },
      data: {
        vaccineName: dto.vaccineName,
        vaccineType: dto.vaccineType,
        batchNumber: dto.batchNumber,
        vaccinationDate: dto.vaccinationDate
          ? new Date(dto.vaccinationDate)
          : undefined,
        nextDueDate: dto.nextDueDate ? new Date(dto.nextDueDate) : undefined,
        administeredBy: dto.administeredBy,
        clinicId: dto.clinicId,
      },
    });
  }

  async deleteVaccination(id: string) {
    return this.prisma.vaccination.delete({ where: { id } });
  }

  // --- Health Records ---

  async getRecords(petId: string) {
    return this.prisma.healthRecord.findMany({
      where: { petId },
      orderBy: { recordDate: 'desc' },
      include: { vetClinic: true },
    });
  }

  async addRecord(petId: string, userId: string, dto: any) {
    return this.prisma.healthRecord.create({
      data: {
        petId,
        userId,
        recordType: dto.recordType,
        recordDate: new Date(dto.recordDate),
        vetClinicId: dto.vetClinicId,
        vetName: dto.vetName,
        title: dto.title,
        description: dto.description,
        diagnosis: dto.diagnosis,
        treatment: dto.treatment,
        medications: dto.medications,
        attachments: dto.attachments,
        nextAppointmentDate: dto.nextAppointmentDate
          ? new Date(dto.nextAppointmentDate)
          : undefined,
        followUpNotes: dto.followUpNotes,
        cost: dto.cost,
      },
    });
  }

  async getRecord(id: string) {
    const record = await this.prisma.healthRecord.findUnique({
      where: { id },
      include: { vetClinic: true },
    });
    if (!record) throw new NotFoundException('Health record not found');
    return record;
  }

  async updateRecord(id: string, dto: any) {
    return this.prisma.healthRecord.update({
      where: { id },
      data: {
        recordType: dto.recordType,
        recordDate: dto.recordDate ? new Date(dto.recordDate) : undefined,
        title: dto.title,
        description: dto.description,
        diagnosis: dto.diagnosis,
        treatment: dto.treatment,
        medications: dto.medications,
        attachments: dto.attachments,
        cost: dto.cost,
      },
    });
  }

  async deleteRecord(id: string) {
    return this.prisma.healthRecord.delete({ where: { id } });
  }

  // --- Appointments ---

  async getAppointments(petId: string) {
    return this.prisma.appointment.findMany({
      where: { petId },
      orderBy: { appointmentDate: 'desc' },
      include: { clinic: true },
    });
  }

  async addAppointment(petId: string, dto: any) {
    return this.prisma.appointment.create({
      data: {
        petId,
        appointmentType: dto.appointmentType,
        appointmentDate: new Date(dto.appointmentDate),
        durationMinutes: dto.durationMinutes || 30,
        vetName: dto.vetName,
        reason: dto.reason,
        clinicId: dto.clinicId,
        notes: dto.notes,
        cost: dto.cost,
      },
    });
  }

  async updateAppointment(id: string, dto: any) {
    return this.prisma.appointment.update({
      where: { id },
      data: {
        appointmentType: dto.appointmentType,
        appointmentDate: dto.appointmentDate
          ? new Date(dto.appointmentDate)
          : undefined,
        durationMinutes: dto.durationMinutes,
        vetName: dto.vetName,
        reason: dto.reason,
        status: dto.status,
        notes: dto.notes,
        cost: dto.cost,
      },
    });
  }

  async deleteAppointment(id: string) {
    return this.prisma.appointment.delete({ where: { id } });
  }

  // --- Medications ---

  async getMedications(petId: string) {
    return this.prisma.medication.findMany({
      where: { petId },
      orderBy: { startDate: 'desc' },
      include: { doses: { orderBy: { scheduledAt: 'desc' }, take: 10 } },
    });
  }

  async addMedication(petId: string, dto: any) {
    return this.prisma.medication.create({
      data: {
        petId,
        name: dto.name,
        dosage: dto.dosage,
        frequency: dto.frequency,
        times: dto.times || [],
        startDate: new Date(dto.startDate),
        endDate: dto.endDate ? new Date(dto.endDate) : undefined,
        notes: dto.notes,
      },
    });
  }

  async updateMedication(id: string, dto: any) {
    return this.prisma.medication.update({
      where: { id },
      data: {
        name: dto.name,
        dosage: dto.dosage,
        frequency: dto.frequency,
        times: dto.times,
        endDate: dto.endDate ? new Date(dto.endDate) : undefined,
        notes: dto.notes,
      },
    });
  }

  async deleteMedication(id: string) {
    return this.prisma.medication.delete({ where: { id } });
  }

  async logMedicationDose(medicationId: string, dto: any) {
    return this.prisma.medicationDose.create({
      data: {
        medicationId,
        scheduledAt: new Date(dto.scheduledAt),
        givenAt: dto.givenAt ? new Date(dto.givenAt) : new Date(),
        skipped: dto.skipped || false,
        notes: dto.notes,
      },
    });
  }

  // --- VetBridge ---

  async generateVetBridgeQr(petId: string, userId: string) {
    const qrCode = `vetbridge_${petId}_${Date.now()}`;

    const share = await this.prisma.vetBridgeShare.create({
      data: {
        petId,
        sharedBy: userId,
        qrCode,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        permissions: { read: true, write: false },
      },
    });

    return { qrCode: share.qrCode, expiresAt: share.expiresAt };
  }

  async getSharedRecords(petId: string) {
    return this.prisma.vetBridgeShare.findMany({
      where: { petId, isActive: true },
    });
  }

  async revokeShare(shareId: string) {
    return this.prisma.vetBridgeShare.update({
      where: { id: shareId },
      data: { isActive: false },
    });
  }

  async getRecentHistory(petId: string) {
    return this.prisma.healthRecord.findMany({
      where: {
        petId,
        recordDate: {
          gte: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
        },
      },
      orderBy: { recordDate: 'desc' },
      take: 10,
    });
  }
}
