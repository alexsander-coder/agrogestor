import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { PlantioService } from './plantio.service';
import { CreatePlantingDto } from './dto/create-planting.dto';

@Controller('plantings')
export class PlantioController {

  constructor(private readonly service: PlantioService) { }

  @Post()
  create(@Body() dto: CreatePlantingDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

}