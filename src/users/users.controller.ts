import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Este controlador estará vacío por ahora.
  // La creación de usuarios se manejará a través de un proceso administrativo
  // interno, no a través de una API pública.
}
