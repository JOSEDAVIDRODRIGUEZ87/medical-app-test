import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>('JWT_REFRESH_SECRET'),
      passReqToCallback: true, // Crucial para obtener el token del header
    });
  }

  /**
   * @param req El objeto de la petición de Express
   * @param payload Los datos decodificados del token (sub, email, role)
   */
  validate(req: Request, payload: any) {
    // Extraemos el token del header para enviarlo al servicio si es necesario
    const authHeader = req.get('authorization');
    const refreshToken = authHeader?.replace('Bearer', '').trim();

    if (!refreshToken) {
      throw new ForbiddenException('Refresh token no encontrado');
    }

    // Retornamos el payload junto con el token original
    return {
      ...payload,
      refreshToken,
    };
  }
}