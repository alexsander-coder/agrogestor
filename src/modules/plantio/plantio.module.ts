import { Module } from '@nestjs/common';
import { PlantioController } from './plantio.controller';
import { PlantioService } from './plantio.service';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [PlantioController],
  providers: [PlantioService]
})
export class PlantioModule { }