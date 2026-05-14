import { SetMetadata } from '@nestjs/common';

// Este decorador permitirá usar @Roles('admin', 'doctor') en los controladores
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);