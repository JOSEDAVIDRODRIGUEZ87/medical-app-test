import { Controller, Get, Patch, Body, Param, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { PrescriptionItemsService } from './prescription-items.service';
import { AtGuard, RolesGuard } from '../common/guards';
import { Roles } from '../common/decorators';
import { UserRole } from '../models/users/user.model';

@UseGuards(AtGuard, RolesGuard)
@Controller('prescription-items')
export class PrescriptionItemsController {
  constructor(private readonly itemsService: PrescriptionItemsService) {}

  // Permite al médico ajustar una dosis o frecuencia sin anular toda la receta
  @Roles(UserRole.DOCTOR)
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateItemDto: any
  ) {
    return this.itemsService.update(id, updateItemDto);
  }

  // Ver detalles de un ítem específico (útil para auditoría o farmacia)
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.itemsService.findOne(id);
  }
}