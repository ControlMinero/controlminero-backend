import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { AuthModule } from '../auth/auth.module'; // Importamos el módulo de Auth

@Module({
  imports: [
    TypeOrmModule.forFeature([Item]),
    AuthModule, // <-- ¡Aquí está la corrección! Le damos acceso a la caja de herramientas.
  ],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
