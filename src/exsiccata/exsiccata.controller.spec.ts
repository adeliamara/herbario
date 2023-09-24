import { Test, TestingModule } from '@nestjs/testing';
import { ExsiccataController } from './exsiccata.controller';
import { ExsiccataService } from './exsiccata.service';

describe('ExsiccataController', () => {
  let controller: ExsiccataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExsiccataController],
      providers: [ExsiccataService],
    }).compile();

    controller = module.get<ExsiccataController>(ExsiccataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
