import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companiesRepository: Repository<Company>,
  ) {}

  // Por ahora, este servicio estará vacío.
  // En el futuro, aquí pondremos la lógica para crear y gestionar empresas.
  // Por ejemplo:
  //
  // async create(createCompanyDto: any): Promise<Company> {
  //   const company = this.companiesRepository.create(createCompanyDto);
  //   return this.companiesRepository.save(company);
  // }
}
