import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './modules/auth/auth.module';
import { CaixaModule } from './modules/caixa/caixa.module';
import { EstoqueModule } from './modules/estoque/estoque.module';
import { FuncionariosModule } from './modules/funcionarios/funcionarios.module';
import { PlantioModule } from './modules/plantio/plantio.module';
import { FrotaModule } from './modules/frota/frota.module';
import { DieselModule } from './modules/diesel/diesel.module';
import { DatabaseModule } from './database/database.module';
import { SeasonModule } from './modules/season/season.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    AuthModule,
    CaixaModule,
    EstoqueModule,
    FuncionariosModule,
    PlantioModule,
    FrotaModule,
    DieselModule,
    DatabaseModule,
    SeasonModule
  ],
})
export class AppModule { }