import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserRole } from '../models/users/user.model';

@Injectable()
export class DoctorsService {
  constructor(private prisma: PrismaService) {}

  // El médico necesita ver a todos los pacientes para crear una prescripción
  async findAllPatients() {
    return this.prisma.user.findMany({
      where: { role: UserRole.PATIENT },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }

  async findDoctorHistory(doctorId: string, status?: string) {
    return this.prisma.prescription.findMany({
      where: {
        doctorId,
        ...(status && { status: status as any }),
      },
      include: {
        patient: { select: { name: true } },
        items: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}