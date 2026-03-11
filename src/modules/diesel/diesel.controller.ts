import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { DieselService } from './diesel.service';
import { CreateTankDto } from './dto/create-tank.dto';
import { CreateFuelEntryDto } from './dto/create-fuel-entry.dto';
import { CreateRefuelDto } from './dto/create-refuel.dto';

@Controller('diesel')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class DieselController {

  constructor(private service: DieselService) { }

  // TANQUES

  @Post('tanks')
  createTank(@Body() dto: CreateTankDto) {
    return this.service.createTank(dto);
  }

  @Get('tanks')
  findTanks() {
    return this.service.findTanks();
  }

  // ENTRADA DE COMBUSTÍVEL
  @Post('entry')
  createEntry(@Body() dto: CreateFuelEntryDto) {
    return this.service.createEntry(dto);
  }

  @Post('refuel')
  createRefuel(@Body() dto: CreateRefuelDto) {
    return this.service.createRefuel(dto);
  }

  @Get('refuel')
  findRefuels() {
    return this.service.findRefuels();
  }

  @Get('refuel/:vehicleId')
  findRefuelsByVehicle(@Param('vehicleId') vehicleId: string) {
    return this.service.findRefuelsByVehicle(vehicleId);
  }

  @Get('tanks/:id/status')
  getTankStatus(@Param('id') id: string) {
    return this.service.getTankStatus(id);
  }

  @Get('consumption/:vehicleId')
  getConsumption(@Param('vehicleId') vehicleId: string) {
    return this.service.calculateConsumption(vehicleId);
  }
}