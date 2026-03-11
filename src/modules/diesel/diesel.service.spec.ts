import { Test, TestingModule } from '@nestjs/testing';
import { DieselService } from './diesel.service';

describe('DieselService', () => {
  let service: DieselService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DieselService],
    }).compile();

    service = module.get<DieselService>(DieselService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
