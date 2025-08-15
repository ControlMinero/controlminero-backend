import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  /**
   * Encuentra un usuario por su dirección de email.
   * Es crucial para el proceso de login.
   * @param email El email del usuario a buscar.
   * @returns El usuario encontrado o null.
   */
  async findOneByEmail(email: string): Promise<User | undefined> {
    // Usamos 'relations' para que también nos traiga la información de la empresa a la que pertenece.
    return this.usersRepository.findOne({
      where: { email },
      relations: ['company'],
    });
  }

  // En el futuro, aquí podríamos agregar funciones para crear nuevos usuarios, etc.
}
