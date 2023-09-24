import { Test, TestingModule } from '@nestjs/testing';
import { GenusController } from './genus.controller';
import { GenusService } from './genus.service';

describe('GenusController', () => {
  let controller: GenusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GenusController],
      providers: [GenusService],
    }).compile();

    controller = module.get<GenusController>(GenusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
