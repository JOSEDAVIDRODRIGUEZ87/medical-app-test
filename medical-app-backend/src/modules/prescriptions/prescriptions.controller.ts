import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  UseGuards, 
  Query, 
  ParseUUIDPipe 
} from '@nestjs/common';
import { PrescriptionsService } from './prescriptions.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { GetUser } from '../common/decorators/get-user.decorator';
import { UserRole } from '../models/users/user.model';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('prescriptions')
export class PrescriptionsController {
  constructor(private readonly prescriptionsService: PrescriptionsService) {}

  @Roles(UserRole.DOCTOR)
  @Post()
  create(@Body() createPrescriptionDto: any, @GetUser('id') doctorId: string) {
    // Forzamos que el doctorId sea el del usuario autenticado
    return this.prescriptionsService.create({ 
      ...createPrescriptionDto, 
      doctorId 
    });
  }

  @Get()
  findAll(
    @GetUser('id') userId: string,
    @GetUser('role') role: string,
    @Query('status') status?: string,
    @Query('patientId') patientId?: string
  ) {
    // Si es ADMIN, puede filtrar por cualquier cosa
    if (role === UserRole.ADMIN) {
      return this.prescriptionsService.findAll({ status, patientId });
    }
    // Si es DOCTOR, ve las que él creó
    if (role === UserRole.DOCTOR) {
      return this.prescriptionsService.findAll({ doctorId: userId, status });
    }
    // Si es PATIENT, solo ve las suyas
    return this.prescriptionsService.findAll({ patientId: userId, status });
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.prescriptionsService.findOne(id);
  }

  @Roles(UserRole.PATIENT)
  @Patch(':id/claim')
  claim(@Param('id', ParseUUIDPipe) id: string, @GetUser('id') patientId: string) {
    // El servicio debe validar que la prescripción pertenezca al paciente
    return this.prescriptionsService.updateStatus(id, patientId, 'RECLAMADO');
  }

  @Get(':id/pdf')
  async downloadPdf(@Param('id', ParseUUIDPipe) id: string) {
    // Este endpoint debería retornar el stream del PDF generado
    return this.prescriptionsService.generatePdf(id);
  }
}