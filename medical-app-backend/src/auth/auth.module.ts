import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RtStrategy } from './strategies/rt.strategy'; // Refresh Token Strategy
import { PrismaModule } from '../prisma/prisma.module'; // Asegúrate de tener exportado PrismaService

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    // Configuramos JWT de forma asíncrona para usar variables de entorno
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '15m' }, // Token de acceso corto
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy,RtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
