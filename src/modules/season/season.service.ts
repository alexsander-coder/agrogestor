import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { CreateSeasonDto } from './dto/create-season.dto';
import { UpdateSeasonDto } from './dto/update-season.dto';

@Injectable()
export class SeasonService {

  constructor(private readonly prisma: PrismaService) { }

  async create(data: CreateSeasonDto) {

    return this.prisma.season.create({
      data: {
        name: data.name,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null
      }
    });

  }

  async findAll() {

    return this.prisma.season.findMany({
      orderBy: {
        startDate: 'desc'
      }
    });

  }

  async findOne(id: string) {

    const season = await this.prisma.season.findUnique({
      where: { id }
    });

    if (!season) {
      throw new NotFoundException('Safra não encontrada');
    }

    return season;

  }

  async update(id: string, data: UpdateSeasonDto) {

    await this.findOne(id);

    return this.prisma.season.update({
      where: { id },
      data: {
        name: data.name,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : undefined
      }
    });

  }

  async delete(id: string) {

    await this.findOne(id);

    return this.prisma.season.delete({
      where: { id }
    });

  }

}