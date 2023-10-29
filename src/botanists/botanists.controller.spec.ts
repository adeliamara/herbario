import { Test, TestingModule } from '@nestjs/testing';
import { BotanistsController } from './botanists.controller'; 
import { BotanistsService } from './botanists.service';

describe('BotanistsController', () => {
  let controller: BotanistsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BotanistsController],
      providers: [BotanistsService],
    }).compile();

    controller = module.get<BotanistsController>(BotanistsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
