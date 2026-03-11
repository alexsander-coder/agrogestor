import { Module } from '@nestjs/common';
import { DieselController } from './diesel.controller';
import { DieselService } from './diesel.service';

@Module({
  controllers: [DieselController],
  providers: [DieselService]
})
export class DieselModule {}
