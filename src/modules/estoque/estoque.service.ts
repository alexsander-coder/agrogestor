import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { StockMovementDto } from './dto/stock-movement.dto';

@Injectable()
export class EstoqueService {

  constructor(private readonly prisma: PrismaService) { }

  async createItem(data: CreateItemDto) {

    return this.prisma.item.create({
      data: {
        name: data.name,
        description: data.description,
        unit: data.unit,
        minimumStock: data.minimumStock ?? 0
      }
    });

  }

  async listItems() {

    return this.prisma.item.findMany({
      orderBy: {
        name: 'asc'
      }
    });

  }

  async getItem(id: string) {

    const item = await this.prisma.item.findUnique({
      where: { id }
    });

    if (!item) {
      throw new NotFoundException('Item não encontrado');
    }

    return item;

  }

  async updateItem(id: string, data: UpdateItemDto) {

    await this.getItem(id);

    return this.prisma.item.update({
      where: { id },
      data
    });

  }

  async deleteItem(id: string) {

    await this.getItem(id);

    const movements = await this.prisma.stockMovement.count({
      where: { itemId: id }
    });

    if (movements > 0) {
      throw new BadRequestException('Item possui movimentações e não pode ser removido');
    }

    return this.prisma.item.delete({
      where: { id }
    });

  }

  async entry(data: StockMovementDto) {

    return this.prisma.$transaction(async (tx) => {

      const item = await tx.item.findUnique({
        where: { id: data.itemId }
      });

      if (!item) {
        throw new NotFoundException('Item não encontrado');
      }

      await tx.stockMovement.create({
        data: {
          itemId: data.itemId,
          type: 'ENTRY',
          quantity: data.quantity,
          reason: data.reason
        }
      });

      return tx.item.update({
        where: { id: data.itemId },
        data: {
          stock: {
            increment: data.quantity
          }
        }
      });

    });

  }

  async exit(data: StockMovementDto) {

    return this.prisma.$transaction(async (tx) => {

      const item = await tx.item.findUnique({
        where: { id: data.itemId }
      });

      if (!item) {
        throw new NotFoundException('Item não encontrado');
      }

      if (item.stock < data.quantity) {
        throw new BadRequestException('Estoque insuficiente');
      }

      await tx.stockMovement.create({
        data: {
          itemId: data.itemId,
          type: 'EXIT',
          quantity: data.quantity,
          reason: data.reason
        }
      });

      return tx.item.update({
        where: { id: data.itemId },
        data: {
          stock: {
            decrement: data.quantity
          }
        }
      });

    });

  }

  async adjust(data: StockMovementDto) {

    return this.prisma.$transaction(async (tx) => {

      const item = await tx.item.findUnique({
        where: { id: data.itemId }
      });

      if (!item) {
        throw new NotFoundException('Item não encontrado');
      }

      await tx.stockMovement.create({
        data: {
          itemId: data.itemId,
          type: 'ADJUSTMENT',
          quantity: data.quantity,
          reason: data.reason
        }
      });

      return tx.item.update({
        where: { id: data.itemId },
        data: {
          stock: data.quantity
        }
      });

    });

  }

}