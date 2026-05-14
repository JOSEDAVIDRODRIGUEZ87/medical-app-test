import { Controller, Get, Patch, Param, UseGuards, Query, ParseUUIDPipe } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { AtGuard, RolesGuard } from '../common/guards';
import { Roles } from '../common/decorators';
import { GetUser } from '../common/decorators';
import { UserRole } from '../models/users/user.model';

@UseGuards(AtGuard, RolesGuard)
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  // Obtener mis prescripciones (el paciente logueado)
  @Roles(UserRole.PATIENT)
  @Get('my-prescriptions')
  getMyPrescriptions(
    @GetUser('id') patientId: string,
    @Query('status') status?: string
  ) {
    return this.patientsService.findPrescriptions(patientId, status);
  }

  // Ver detalle de una receta específica
  @Roles(UserRole.PATIENT)
  @Get('prescriptions/:id')
  getDetail(@Param('id', ParseUUIDPipe) id: string, @GetUser('id') patientId: string) {
    return this.patientsService.findOnePrescription(id, patientId);
  }
}