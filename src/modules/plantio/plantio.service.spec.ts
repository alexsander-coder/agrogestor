import { Test, TestingModule } from '@nestjs/testing';
import { PlantioService } from './plantio.service';

describe('PlantioService', () => {
  let service: PlantioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlantioService],
    }).compile();

    service = module.get<PlantioService>(PlantioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
