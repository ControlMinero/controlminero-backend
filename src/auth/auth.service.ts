import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Valida las credenciales de un usuario.
   * @param email El email del usuario.
   * @param pass La contraseña en texto plano.
   * @returns Un objeto con el token de acceso si las credenciales son válidas.
   */
  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    // 1. Busca al usuario por su email en la base de datos.
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas.');
    }

    // 2. Compara de forma segura la contraseña enviada con la encriptada en la BD.
    const isMatch = await bcrypt.compare(pass, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Credenciales inválidas.');
    }

    // 3. Si todo es correcto, crea el "pase de acceso" (token JWT).
    // Este token contiene información no sensible del usuario.
    const payload = { 
      sub: user.id, 
      email: user.email, 
      companyId: user.companyId 
    };
    
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}