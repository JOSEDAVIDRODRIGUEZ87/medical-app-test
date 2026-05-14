import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PrescriptionsService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    const { doctorId, patientId, items, description } = data;

    // Usamos una transacción o creación anidada de Prisma
    return this.prisma.prescription.create({
      data: {
        description,
        status: 'PENDIENTE',
        // Conexión con el médico (debe existir en User)
        doctor: { connect: { id: doctorId } },
        // Conexión con el paciente (debe existir en User)
        patient: { connect: { id: patientId } },
        // Creación de los items en la misma operación
        items: {
          create: items.map((item: any) => ({
            name: item.name,
            dosage: item.dosage,
            frequency: item.frequency,
          })),
        },
      },
      include: {
        items: true, // Para devolver la receta con sus items al front
      },
    });
  }

  async findAll(filters: { doctorId?: string; patientId?: string; status?: string }) {
    return this.prisma.prescription.findMany({
      where: {
        doctorId: filters.doctorId,
        patientId: filters.patientId,
        status: filters.status as any,
      },
      include: {
        patient: { select: { name: true, email: true } },
        doctor: { select: { name: true } },
        items: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const prescription = await this.prisma.prescription.findUnique({
      where: { id },
      include: { items: true, patient: true, doctor: true },
    });

    if (!prescription) throw new NotFoundException('Prescripción no encontrada');
    return prescription;
  }

  async updateStatus(id: string, userId: string, status: string) {
    // Validamos que la receta exista y pertenezca al paciente que intenta reclamarla
    const prescription = await this.prisma.prescription.findUnique({
      where: { id },
    });

    if (!prescription) throw new NotFoundException('Prescripción no encontrada');
    if (prescription.patientId !== userId) {
      throw new ForbiddenException('No tienes permiso para modificar esta receta');
    }

    return this.prisma.prescription.update({
      where: { id },
      data: { status: status as any },
    });
  }

  // Placeholder para el PDF (puedes implementarlo con pdfkit si te da el tiempo)
  async generatePdf(id: string) {
    const data = await this.findOne(id);
    // Aquí iría la lógica de generación. 
    // Por ahora, podrías devolver la data y manejar la visualización en el Front.
    return data;
  }
}