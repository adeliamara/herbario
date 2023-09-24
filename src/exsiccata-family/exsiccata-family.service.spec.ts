import { Test, TestingModule } from '@nestjs/testing';
import { ExsiccataFamilyService } from './exsiccata-family.service';

describe('ExsiccataFamilyService', () => {
  let service: ExsiccataFamilyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExsiccataFamilyService],
    }).compile();

    service = module.get<ExsiccataFamilyService>(ExsiccataFamilyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
