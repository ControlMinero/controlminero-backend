import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CompaniesModule } from './companies/companies.module';
import { ItemsModule } from './items/items.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    // Módulo para gestionar variables de entorno (como la URL de la base de datos)
    ConfigModule.forRoot({ isGlobal: true }),

    // Configuración de la conexión con la base de datos PostgreSQL
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DATABASE_URL'), // Lee la URL desde las variables de Render
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, // En desarrollo, esto crea las tablas de la BD automáticamente
        ssl: {
          rejectUnauthorized: false, // Necesario para la conexión con Render
        },
      }),
      inject: [ConfigService],
    }),

    // Aquí registramos todos los módulos de nuestra aplicación
    AuthModule,
    CompaniesModule,
    ItemsModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
