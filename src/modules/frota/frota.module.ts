import { Module } from '@nestjs/common';
import { FrotaController } from './frota.controller';
import { FrotaService } from './frota.service';

@Module({
  controllers: [FrotaController],
  providers: [FrotaService]
})
export class FrotaModule {}
