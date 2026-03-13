import {
  Injectable,
  NotFoundException,
  BadRequestException
} from '@nestjs/common';

import { PrismaService } from '../../database/prisma/prisma.service';
import { CreatePlantingDto } from './dto/create-planting.dto';

@Injectable()
export class PlantioService {

  constructor(private readonly prisma: PrismaService) { }

  async create(data: CreatePlantingDto) {

    return this.prisma.$transaction(async (tx) => {

      const area = await tx.area.findUnique({
        where: { id: data.areaId }
      });

      if (!area) {
        throw new NotFoundException('Área não encontrada');
      }

      const crop = await tx.crop.findUnique({
        where: { id: data.cropId }
      });

      if (!crop) {
        throw new NotFoundException('Cultura não encontrada');
      }

      const season = await tx.season.findUnique({
        where: { id: data.seasonId }
      });

      if (!season) {
        throw new NotFoundException('Safra não encontrada');
      }

      const planting = await tx.planting.create({
        data: {
          areaId: data.areaId,
          cropId: data.cropId,
          seasonId: data.seasonId,
          plantingDate: new Date(data.plantingDate)
        }
      });

      for (const input of data.inputs) {

        const item = await tx.item.findUnique({
          where: { id: input.itemId }
        });

        if (!item) {
          throw new NotFoundException(`Item ${input.itemId} não encontrado`);
        }

        if (item.stock < input.quantity) {
          throw new BadRequestException(
            `Estoque insuficiente para ${item.name}`
          );
        }

        await tx.plantingInput.create({
          data: {
            plantingId: planting.id,
            itemId: input.itemId,
            quantity: input.quantity
          }
        });

        await tx.stockMovement.create({
          data: {
            itemId: input.itemId,
            type: 'EXIT',
            quantity: input.quantity,
            reason: `Plantio ${crop.name}`
          }
        });

        await tx.item.update({
          where: { id: input.itemId },
          data: {
            stock: {
              decrement: input.quantity
            }
          }
        });

      }

      return planting;

    });

  }

  async findAll() {

    return this.prisma.planting.findMany({
      include: {
        area: true,
        crop: true,
        season: true,
        inputs: {
          include: {
            item: true
          }
        },
        harvest: true
      },
      orderBy: {
        plantingDate: 'desc'
      }
    });

  }

  async findOne(id: string) {

    const planting = await this.prisma.planting.findUnique({
      where: { id },
      include: {
        area: true,
        crop: true,
        season: true,
        inputs: {
          include: {
            item: true
          }
        },
        harvest: true
      }
    });

    if (!planting) {
      throw new NotFoundException('Plantio não encontrado');
    }

    return planting;

  }

}