import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';

@Injectable()
export class FrotaService {

  constructor(private prisma: PrismaService) { }

  create(data: CreateVehicleDto) {
    return this.prisma.vehicle.create({
      data
    });
  }

  findAll() {
    return this.prisma.vehicle.findMany();
  }

}
