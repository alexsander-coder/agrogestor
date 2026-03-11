import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateTankDto } from './dto/create-tank.dto';
import { CreateFuelEntryDto } from './dto/create-fuel-entry.dto';
import { CreateRefuelDto } from './dto/create-refuel.dto';

@Injectable()
export class DieselService {

  constructor(private prisma: PrismaService) { }

  createTank(data: CreateTankDto) {
    return this.prisma.fuelTank.create({
      data
    });
  }

  findTanks() {
    return this.prisma.fuelTank.findMany();
  }

  async createEntry(dto: CreateFuelEntryDto) {

    const tank = await this.prisma.fuelTank.findUnique({
      where: { id: dto.tankId }
    });

    if (!tank) {
      throw new NotFoundException("Tank not found");
    }

    // valida capacidade máxima
    if (tank.level + dto.liters > tank.capacity) {
      throw new BadRequestException("Tank capacity exceeded");
    }

    // cria registro de entrada
    const entry = await this.prisma.fuelEntry.create({
      data: dto
    });

    // atualiza nível do tanque
    await this.prisma.fuelTank.update({
      where: { id: dto.tankId },
      data: {
        level: {
          increment: dto.liters
        }
      }
    });

    return entry;
  }

  async createRefuel(dto: CreateRefuelDto) {

    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id: dto.vehicleId }
    });

    if (!vehicle) {
      throw new NotFoundException("Vehicle not found");
    }

    const tank = await this.prisma.fuelTank.findUnique({
      where: { id: dto.tankId }
    });

    if (!tank) {
      throw new NotFoundException("Tank not found");
    }

    // valida combustível suficiente
    if (tank.level < dto.liters) {
      throw new BadRequestException("Insufficient fuel in tank");
    }

    // valida odometro
    if (dto.odometer < vehicle.odometer) {
      throw new BadRequestException("Odometer cannot decrease");
    }

    const refuel = await this.prisma.refuel.create({
      data: dto
    });

    // desconta combustível do tanque
    await this.prisma.fuelTank.update({
      where: { id: dto.tankId },
      data: {
        level: {
          decrement: dto.liters
        }
      }
    });

    // atualiza odometro do veículo
    await this.prisma.vehicle.update({
      where: { id: dto.vehicleId },
      data: {
        odometer: dto.odometer
      }
    });

    return refuel;
  }

  async findRefuels() {
    return this.prisma.refuel.findMany({
      include: {
        vehicle: true,
        tank: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async calculateConsumption(vehicleId: string) {

    const refuels = await this.prisma.refuel.findMany({
      where: { vehicleId },
      orderBy: { createdAt: 'asc' }
    });

    if (refuels.length < 2) {
      throw new BadRequestException("Not enough refuels to calculate consumption");
    }

    const first = refuels[0];
    const last = refuels[refuels.length - 1];

    const kmDriven = last.odometer - first.odometer;

    const totalLiters = refuels.reduce((sum, r) => {
      return sum + r.liters;
    }, 0);

    const consumption = kmDriven / totalLiters;

    return {
      vehicleId,
      totalLiters,
      kmDriven,
      consumption: Number(consumption.toFixed(2))
    };
  }

  async findRefuelsByVehicle(vehicleId: string) {

    return this.prisma.refuel.findMany({
      where: { vehicleId },
      include: {
        tank: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

  }

  async getTankStatus(id: string) {

    const tank = await this.prisma.fuelTank.findUnique({
      where: { id }
    });

    if (!tank) {
      throw new NotFoundException("Tank not found");
    }

    const percentage = (tank.level / tank.capacity) * 100;

    return {
      id: tank.id,
      name: tank.name,
      capacity: tank.capacity,
      level: tank.level,
      percentage: Number(percentage.toFixed(2))
    };
  }

}
