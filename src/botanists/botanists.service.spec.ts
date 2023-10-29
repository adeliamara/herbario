import { Test, TestingModule } from '@nestjs/testing';
import { BotanistsService } from './botanists.service';

describe('BotanistsService', () => {
  let service: BotanistsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BotanistsService],
    }).compile();

    service = module.get<BotanistsService>(BotanistsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
