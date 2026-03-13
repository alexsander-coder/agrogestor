import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { EstoqueService } from './estoque.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { StockMovementDto } from './dto/stock-movement.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('estoque')
// @UseGuards(JwtAuthGuard)
// @ApiBearerAuth()
export class EstoqueController {

  constructor(private readonly service: EstoqueService) { }

  @Post('item')
  createItem(@Body() dto: CreateItemDto) {
    return this.service.createItem(dto);
  }

  @Get('item')
  listItems() {
    return this.service.listItems();
  }

  @Get('item/:id')
  getItem(@Param('id') id: string) {
    return this.service.getItem(id);
  }

  @Patch('item/:id')
  updateItem(@Param('id') id: string, @Body() dto: UpdateItemDto) {
    return this.service.updateItem(id, dto);
  }

  @Delete('item/:id')
  deleteItem(@Param('id') id: string) {
    return this.service.deleteItem(id);
  }

  @Post('entry')
  entry(@Body() dto: StockMovementDto) {
    return this.service.entry(dto);
  }

  @Post('exit')
  exit(@Body() dto: StockMovementDto) {
    return this.service.exit(dto);
  }

  @Post('adjust')
  adjust(@Body() dto: StockMovementDto) {
    return this.service.adjust(dto);
  }

}