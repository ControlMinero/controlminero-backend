import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule, // Importamos el módulo de usuarios para poder buscarlos
    ConfigModule, // Para leer variables de entorno
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'un_secreto_muy_seguro_por_defecto', // Clave secreta para firmar los tokens
        signOptions: { expiresIn: '8h' }, // Los tokens expirarán en 8 horas
        global: true,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
