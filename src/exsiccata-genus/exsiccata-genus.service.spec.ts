import { Test, TestingModule } from '@nestjs/testing';
import { ExsiccataGenusService } from './exsiccata-genus.service';

describe('ExsiccataGenusService', () => {
  let service: ExsiccataGenusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExsiccataGenusService],
    }).compile();

    service = module.get<ExsiccataGenusService>(ExsiccataGenusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
