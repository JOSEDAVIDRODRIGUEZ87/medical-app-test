import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PatientsService {
  constructor(private prisma: PrismaService) {}

  async findPrescriptions(patientId: string, status?: string) {
    return this.prisma.prescription.findMany({
      where: {
        patientId,
        ...(status && { status: status as any }), // Filtro opcional por estado
      },
      include: {
        doctor: { select: { name: true } },
        items: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOnePrescription(id: string, patientId: string) {
    const prescription = await this.prisma.prescription.findUnique({
      where: { id },
      include: { items: true, doctor: true }
    });

    if (!prescription) throw new NotFoundException('Receta no encontrada');
    
    // Validación de seguridad: ¿Es realmente suya?
    if (prescription.patientId !== patientId) {
      throw new ForbiddenException('No tienes permiso para ver esta receta');
    }

    return prescription;
  }
}