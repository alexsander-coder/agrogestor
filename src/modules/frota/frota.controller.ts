import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { FrotaService } from './frota.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';

@Controller('frota')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class FrotaController {

  constructor(private service: FrotaService) { }

  @Post()
  create(@Body() dto: CreateVehicleDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

}
