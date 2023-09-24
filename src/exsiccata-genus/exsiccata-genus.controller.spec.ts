import { Test, TestingModule } from '@nestjs/testing';
import { ExsiccataGenusController } from './exsiccata-genus.controller';
import { ExsiccataGenusService } from './exsiccata-genus.service';

describe('ExsiccataGenusController', () => {
  let controller: ExsiccataGenusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExsiccataGenusController],
      providers: [ExsiccataGenusService],
    }).compile();

    controller = module.get<ExsiccataGenusController>(ExsiccataGenusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
