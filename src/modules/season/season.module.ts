import { Module } from '@nestjs/common';
import { SeasonController } from './season.controller';
import { SeasonService } from './season.service';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [SeasonController],
  providers: [SeasonService],
  exports: [SeasonService]
})
export class SeasonModule { }