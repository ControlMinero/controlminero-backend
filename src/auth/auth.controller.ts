import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Inicia sesión para un usuario.
   * @route POST /auth/login
   * @body { email: 'admin@empresa.cl', password: '123' }
   */
  @HttpCode(HttpStatus.OK) // Devuelve un código 200 (OK) si es exitoso
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    // Le pasa el email y la contraseña al servicio para que los valide.
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
}
