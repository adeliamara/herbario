import { Test, TestingModule } from '@nestjs/testing';
import { ExsiccataService } from './exsiccata.service';

describe('ExsiccataService', () => {
  let service: ExsiccataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExsiccataService],
    }).compile();

    service = module.get<ExsiccataService>(ExsiccataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
