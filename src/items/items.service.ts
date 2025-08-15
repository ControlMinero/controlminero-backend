import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,
  ) {}

  /**
   * Crea un nuevo ítem para una empresa específica.
   * @param createItemDto Los datos del ítem a crear.
   * @param companyId El ID de la empresa dueña del ítem.
   * @returns El nuevo ítem creado.
   */
  async create(createItemDto: any, companyId: string): Promise<Item> {
    // CORRECCIÓN: Creamos y guardamos el ítem en un solo paso más explícito.
    const newItem = this.itemsRepository.create({
      ...createItemDto,
      companyId: companyId,
    });
    return this.itemsRepository.save(newItem);
  }

  /**
   * Encuentra todos los ítems que pertenecen a una empresa específica.
   * @param companyId El ID de la empresa.
   * @returns Una lista de los ítems de esa empresa.
   */
  async findAllByCompany(companyId: string): Promise<Item[]> {
    return this.itemsRepository.find({
      where: { companyId },
      order: { createdAt: 'DESC' }, // Ordena los más nuevos primero
    });
  }

  /**
   * Encuentra un ítem específico, asegurándose de que pertenezca a la empresa correcta.
   * @param id El ID del ítem.
   * @param companyId El ID de la empresa que solicita el ítem.
   * @returns El ítem encontrado.
   */
  async findOne(id: string, companyId: string): Promise<Item> {
    const item = await this.itemsRepository.findOneBy({ id, companyId }); // Búsqueda más segura
    if (!item) {
      throw new NotFoundException(`Ítem con ID "${id}" no encontrado o no pertenece a su empresa.`);
    }
    return item;
  }

  /**
   * Actualiza un ítem, verificando la propiedad primero.
   * @param id El ID del ítem a actualizar.
   * @param updateItemDto Los datos para actualizar.
   * @param companyId El ID de la empresa.
   * @returns El ítem actualizado.
   */
  async update(id: string, updateItemDto: any, companyId: string): Promise<Item> {
    const item = await this.findOne(id, companyId); // Reutilizamos para verificar propiedad y existencia
    const updatedItem = Object.assign(item, updateItemDto);
    return this.itemsRepository.save(updatedItem);
  }

  /**
   * Elimina un ítem, verificando la propiedad primero.
   * @param id El ID del ítem a eliminar.
   * @param companyId El ID de la empresa.
   * @returns Un mensaje de confirmación.
   */
  async remove(id: string, companyId: string): Promise<{ message: string }> {
    const item = await this.findOne(id, companyId); // Reutilizamos para verificar
    await this.itemsRepository.remove(item);
    return { message: `Ítem "${item.title}" eliminado correctamente.` };
  }
}
