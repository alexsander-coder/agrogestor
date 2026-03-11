import { Module } from '@nestjs/common';
import { PlantioController } from './plantio.controller';
import { PlantioService } from './plantio.service';

@Module({
  controllers: [PlantioController],
  providers: [PlantioService]
})
export class PlantioModule {}
