import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
// import { CompaniesService } from './companies.service';
// import { CompaniesController } from './companies.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Company])], // Hacemos que la entidad Company esté disponible en este módulo
  // controllers: [CompaniesController], // Descomentaremos esto cuando creemos el controlador
  // providers: [CompaniesService], // Descomentaremos esto cuando creemos el servicio
})
export class CompaniesModule {}
