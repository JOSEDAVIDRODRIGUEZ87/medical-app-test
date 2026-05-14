import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { AtGuard, RolesGuard } from '../common/guards';
import { Roles, GetUser } from '../common/decorators';
import { UserRole } from '../models/users/user.model';

@UseGuards(AtGuard, RolesGuard)
@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  // Obtener la lista de pacientes registrados en el sistema para poder recetarles
  @Roles(UserRole.DOCTOR)
  @Get('patients')
  getPatients() {
    return this.doctorsService.findAllPatients();
  }

  // Obtener el historial de prescripciones que este médico específico ha realizado
  @Roles(UserRole.DOCTOR)
  @Get('my-history')
  getMyHistory(
    @GetUser('id') doctorId: string,
    @Query('status') status?: string
  ) {
    return this.doctorsService.findDoctorHistory(doctorId, status);
  }
}