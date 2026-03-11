import { Test, TestingModule } from '@nestjs/testing';
import { FrotaController } from './frota.controller';

describe('FrotaController', () => {
  let controller: FrotaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FrotaController],
    }).compile();

    controller = module.get<FrotaController>(FrotaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
