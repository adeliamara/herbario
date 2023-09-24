import { Test, TestingModule } from '@nestjs/testing';
import { ExsiccataFamilyController } from './exsiccata-family.controller';
import { ExsiccataFamilyService } from './exsiccata-family.service';

describe('ExsiccataFamilyController', () => {
  let controller: ExsiccataFamilyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExsiccataFamilyController],
      providers: [ExsiccataFamilyService],
    }).compile();

    controller = module.get<ExsiccataFamilyController>(ExsiccataFamilyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
