import { Module } from '@nestjs/common';
import { PrescriptionsService } from './prescriptions.service';
import { PrescriptionsController } from './prescriptions.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module'; // Importante para validaciones cruzadas

@Module({
  imports: [
    PrismaModule,
    UserModule, // Lo inyectamos para tener acceso a UserService si fuera necesario
  ],
  controllers: [PrescriptionsController],
  providers: [PrescriptionsService],
  exports: [PrescriptionsService], // Exportamos por si el AdminModule necesita métricas de aquí
})
export class PrescriptionsModule {}