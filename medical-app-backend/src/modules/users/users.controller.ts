import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  UseGuards, 
  Param, 
  ParseUUIDPipe 
} from '@nestjs/common';
import { UserService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; // Ajusta según tu nombre de archivo
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../../models/users/users.model'; // Tu ruta específica

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(UserRole.ADMIN) // Solo el ADMIN puede crear nuevos usuarios (Médicos/Pacientes)
  @Post()
  create(@Body() createUserDto: any) {
    return this.userService.create(createUserDto);
  }

  @Roles(UserRole.ADMIN)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Roles(UserRole.ADMIN)
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.findOne(id);
  }

  // Este endpoint es útil para que cualquier usuario logueado vea su propio perfil
  @Get('profile/me')
  getMe(@Req() req: any) {
    return req.user;
  }
}