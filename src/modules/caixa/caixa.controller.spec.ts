import { Test, TestingModule } from '@nestjs/testing';
import { CaixaController } from './caixa.controller';

describe('CaixaController', () => {
  let controller: CaixaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CaixaController],
    }).compile();

    controller = module.get<CaixaController>(CaixaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
