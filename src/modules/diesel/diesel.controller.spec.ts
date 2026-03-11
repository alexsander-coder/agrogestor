import { Test, TestingModule } from '@nestjs/testing';
import { DieselController } from './diesel.controller';

describe('DieselController', () => {
  let controller: DieselController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DieselController],
    }).compile();

    controller = module.get<DieselController>(DieselController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
