import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    UsersModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'un_secreto_muy_seguro_por_defecto',
        signOptions: { expiresIn: '8h' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, AuthGuard], // El guardia es un proveedor de este módulo
  controllers: [AuthController],
  // CORRECCIÓN: Exportamos el guardia y sus herramientas para que otros módulos puedan usarlos.
  exports: [AuthService, AuthGuard, JwtModule], 
})
export class AuthModule {}
