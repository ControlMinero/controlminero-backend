import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { CreateItemDto } from './dto/create-item.dto';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,
  ) {}

  async create(createItemDto: CreateItemDto, companyId: string): Promise<Item> {
    const newItem = new Item();
    newItem.title = createItemDto.title;
    newItem.description = createItemDto.description;
    newItem.type = createItemDto.type;
    newItem.companyId = companyId;

    return this.itemsRepository.save(newItem);
  }

  async findAllByCompany(companyId: string): Promise<Item[]> {
    return this.itemsRepository.find({
      where: { companyId },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string, companyId: string): Promise<Item> {
    const item = await this.itemsRepository.findOneBy({ id, companyId });
    if (!item) {
      throw new NotFoundException(`Ítem con ID "${id}" no encontrado o no pertenece a su empresa.`);
    }
    return item;
  }

  async update(id: string, updateItemDto: any, companyId: string): Promise<Item> {
    const item = await this.findOne(id, companyId);
    const updatedItem = Object.assign(item, updateItemDto);
    return this.itemsRepository.save(updatedItem);
  }

  async remove(id: string, companyId: string): Promise<{ message: string }> {
    const item = await this.findOne(id, companyId);
    await this.itemsRepository.remove(item);
    return { message: `Ítem "${item.title}" eliminado correctamente.` };
  }
}

