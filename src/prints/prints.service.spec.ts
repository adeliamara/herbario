import { Test, TestingModule } from '@nestjs/testing';
import { PrintsService } from './prints.service';

describe('PrintsService', () => {
  let service: PrintsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrintsService],
    }).compile();

    service = module.get<PrintsService>(PrintsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
