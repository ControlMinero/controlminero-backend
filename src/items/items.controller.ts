import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ItemsService } from './items.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateItemDto } from './dto/create-item.dto'; // Importamos el nuevo DTO

@UseGuards(AuthGuard)
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  create(@Body() createItemDto: CreateItemDto, @Req() req) { // Usamos el DTO
    const companyId = req.user.companyId; 
    return this.itemsService.create(createItemDto, companyId);
  }

  @Get()
  findAll(@Req() req) {
    const companyId = req.user.companyId;
    return this.itemsService.findAllByCompany(companyId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    const companyId = req.user.companyId;
    return this.itemsService.findOne(id, companyId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemDto: any, @Req() req) {
    const companyId = req.user.companyId;
    return this.itemsService.update(id, updateItemDto, companyId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    const companyId = req.user.companyId;
    return this.itemsService.remove(id, companyId);
  }
}
