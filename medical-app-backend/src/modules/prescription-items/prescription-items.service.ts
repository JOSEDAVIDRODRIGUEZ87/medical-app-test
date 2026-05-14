import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PrescriptionItemsService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string) {
    const item = await this.prisma.prescriptionItem.findUnique({
      where: { id },
    });
    if (!item) throw new NotFoundException('Ítem de prescripción no encontrado');
    return item;
  }

  async update(id: string, data: any) {
    // Verificamos existencia antes de actualizar
    await this.findOne(id);

    return this.prisma.prescriptionItem.update({
      where: { id },
      data: {
        name: data.name,
        dosage: data.dosage,
        frequency: data.frequency,
      },
    });
  }

  // Útil si el médico decide eliminar un medicamento de la lista antes de que sea reclamado
  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.prescriptionItem.delete({ where: { id } });
  }
}