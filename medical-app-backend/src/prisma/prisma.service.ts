import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  
  async onModuleInit() {
    // Se conecta a la base de datos cuando se inicia el módulo
    await this.$connect();
  }

  async onModuleDestroy() {
    // Se desconecta cuando se apaga la aplicación
    await this.$disconnect();
  }

  // Helper para limpiar la base de datos (útil para los tests si te da tiempo)
  async cleanDb() {
    return this.$transaction([
      this.prescriptionItem.deleteMany(),
      this.prescription.deleteMany(),
      this.user.deleteMany(),
    ]);
  }
}