import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { AtGuard, RtGuard } from '../common/guards'; // Tus guards personalizados
import { GetUser, Public } from '../common/decorators'; // Decoradores para limpiar el código
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public() // Decorador para saltar el AtGuard global si lo tienes
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }

  @Public()
  @UseGuards(RtGuard) // Valida el Refresh Token
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetUser('id') userId: string,
    @GetUser('refreshToken') refreshToken: string,
  ) {
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @UseGuards(AtGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetUser('id') userId: string) {
    return this.authService.logout(userId);
  }

  @UseGuards(AtGuard)
  @Get('profile')
  getProfile(@GetUser() user: any) {
    // Retorna el usuario y su rol como pide la imagen 7
    return user;
  }
}