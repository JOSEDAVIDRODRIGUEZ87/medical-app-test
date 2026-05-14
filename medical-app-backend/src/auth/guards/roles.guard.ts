import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. Obtener los roles requeridos desde el decorador @Roles
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    // Si la ruta no tiene el decorador @Roles, se permite el acceso
    if (!requiredRoles) {
      return true;
    }

    // 2. Obtener el usuario de la petición (inyectado por el JwtStrategy)
    const { user } = context.switchToHttp().getRequest();

    // 3. Verificar si el usuario tiene uno de los roles permitidos
    const hasRole = requiredRoles.some((role) => user?.role?.includes(role));

    if (!hasRole) {
      throw new ForbiddenException('No tienes permisos para acceder a esta ruta');
    }

    return true;
  }
}