import { Test, TestingModule } from '@nestjs/testing';
import { ExsiccataSpeciesController } from './exsiccata-species.controller';
import { ExsiccataSpeciesService } from './exsiccata-species.service';

describe('ExsiccataSpeciesController', () => {
  let controller: ExsiccataSpeciesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExsiccataSpeciesController],
      providers: [ExsiccataSpeciesService],
    }).compile();

    controller = module.get<ExsiccataSpeciesController>(ExsiccataSpeciesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
