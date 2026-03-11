import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';

@Injectable()
export class FuncionariosService {

  constructor(private prisma: PrismaService) { }

  create(data: CreateFuncionarioDto) {
    return this.prisma.employee.create({
      data
    });
  }

  findAll() {
    return this.prisma.employee.findMany();
  }

  findOne(id: string) {
    return this.prisma.employee.findUnique({
      where: { id }
    });
  }

}