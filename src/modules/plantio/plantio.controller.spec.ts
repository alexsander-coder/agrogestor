import { Test, TestingModule } from '@nestjs/testing';
import { PlantioController } from './plantio.controller';

describe('PlantioController', () => {
  let controller: PlantioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlantioController],
    }).compile();

    controller = module.get<PlantioController>(PlantioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
