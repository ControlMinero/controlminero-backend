import { Controller } from '@nestjs/common';
import { CompaniesService } from './companies.service';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  // Este controlador estará vacío por ahora.
  // No necesitamos rutas públicas para crear o listar empresas,
  // ya que se gestionarán internamente.
}
