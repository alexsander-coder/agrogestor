import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { FuncionariosService } from './funcionarios.service';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';

@Controller('funcionarios')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class FuncionariosController {

  constructor(private service: FuncionariosService) { }

  @Post()
  create(@Body() dto: CreateFuncionarioDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

}