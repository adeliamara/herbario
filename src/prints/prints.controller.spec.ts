import { Test, TestingModule } from '@nestjs/testing';
import { PrintsController } from './prints.controller';
import { PrintsService } from './prints.service';

describe('PrintsController', () => {
  let controller: PrintsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrintsController],
      providers: [PrintsService],
    }).compile();

    controller = module.get<PrintsController>(PrintsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
