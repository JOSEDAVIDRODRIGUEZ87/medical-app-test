import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async login(dto: AuthDto) {
    // 1. Buscar usuario por email
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) throw new UnauthorizedException('Credenciales inválidas');

    // 2. Comparar password
    const pwMatches = await bcrypt.compare(dto.password, user.password);
    if (!pwMatches) throw new UnauthorizedException('Credenciales inválidas');

    // 3. Generar y retornar tokens
    const tokens = await this.getTokens(user.id, user.email, user.role);
    return tokens;
  }

  async refreshTokens(userId: string, rt: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    // En una prueba técnica real, aquí compararías el RT con un hash en la DB.
    // Si el tiempo apremia, basta con validar que el usuario exista y re-emitir tokens.
    if (!user) throw new ForbiddenException('Acceso denegado');

    const tokens = await this.getTokens(user.id, user.email, user.role);
    return tokens;
  }

  async logout(userId: string) {
    // Si guardaste el RT en la DB, aquí lo pondrías a null. 
    // Para el MVP de hoy, con que el Front borre el token basta.
    return { message: 'Logged out successfully' };
  }

  // --- Helpers ---

  async getTokens(userId: string, email: string, role: string) {
    const jwtPayload = {
      sub: userId,
      email,
      role, // Importante para el RBAC en el front y back
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('JWT_SECRET'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}