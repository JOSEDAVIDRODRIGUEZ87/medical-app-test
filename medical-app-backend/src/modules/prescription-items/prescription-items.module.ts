import { Module } from '@nestjs/common';
import { PrescriptionItemsService } from './prescription-items.service';
import { PrescriptionItemsController } from './prescription-items.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PrescriptionItemsController],
  providers: [PrescriptionItemsService],
  exports: [PrescriptionItemsService],
})
export class PrescriptionItemsModule {}