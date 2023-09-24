import { Test, TestingModule } from '@nestjs/testing';
import { CollectorsService } from './collectors.service';

describe('CollectorsService', () => {
  let service: CollectorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CollectorsService],
    }).compile();

    service = module.get<CollectorsService>(CollectorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
