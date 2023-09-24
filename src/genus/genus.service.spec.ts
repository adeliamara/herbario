import { Test, TestingModule } from '@nestjs/testing';
import { GenusService } from './genus.service';

describe('GenusService', () => {
  let service: GenusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GenusService],
    }).compile();

    service = module.get<GenusService>(GenusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
