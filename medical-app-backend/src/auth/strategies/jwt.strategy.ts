import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_SECRET'),
    });
  }

  // El payload es lo que firmamos en el AuthService.getTokens()
  async validate(payload: { sub: string; email: string; role: string }) {
    // Buscamos al usuario para asegurarnos de que aún existe
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado o token inválido');
    }

    // Lo que retornes aquí se inyectará en req.user
    return {
      id: user.id,
      email: user.email,
      role: user.role, // Vital para el RolesGuard
    };
  }
}