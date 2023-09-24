import { Test, TestingModule } from '@nestjs/testing';
import { ExsiccataSpeciesService } from './exsiccata-species.service';

describe('ExsiccataSpeciesService', () => {
  let service: ExsiccataSpeciesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExsiccataSpeciesService],
    }).compile();

    service = module.get<ExsiccataSpeciesService>(ExsiccataSpeciesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
