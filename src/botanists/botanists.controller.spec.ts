import { Test, TestingModule } from '@nestjs/testing';
import { BotanistsController } from './botanists.controller';
import { BotanistsService } from './botanists.service';
import { CreateBotanistDto } from './dto/create-botanist.dto';
import { UpdateBotanistDto } from './dto/update-botanist.dto';

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

  it('should create a botanist', () => {
    const CreateBotanistDto: CreateBotanistDto = {name: 'clar', email: 'jkfdwa', institution: 'ifps'};

    expect(controller.create(CreateBotanistDto)).toBeDefined(); 
  });

  it('should find all botanists', () => {
    expect(controller.findAll()).toBeDefined(); 
  });

  it('should find one botanist by ID', () => {
    const botanistId = 1; 
    expect(controller.findOne(botanistId)).toBeDefined(); 
  });

  it('should update a botanist by ID', () => {
    const botanistId = 1;
    const updateBotanistDto: UpdateBotanistDto = {};

    expect(controller.update(botanistId, updateBotanistDto)).toBeDefined(); 
  });

  it('should remove a botanist by ID', () => {
    const botanistId = 1; 
    expect(controller.remove(botanistId)).toBeDefined();
  });
});
