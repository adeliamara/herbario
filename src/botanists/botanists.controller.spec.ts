import { Test, TestingModule } from "@nestjs/testing";
import { BotanistsController } from "./botanists.controller";
import { BotanistsService } from "./botanists.service";
import { CreateBotanistDto } from "./dto/create-botanist.dto";
import { UpdateBotanistDto } from "./dto/update-botanist.dto";

class MockBotanistRepository {
  private botanists = [];

  async findOne(id: number) {
    return this.botanists.find(botanist => botanist.id === id);
  }

  async find() {
    return this.botanists;
  }

  async save(botanistData) {
    const newBotanist = { id: this.botanists.length + 1, ...botanistData };
    this.botanists.push(newBotanist);
    return newBotanist;
  }

  async update(id: number, updateBotanistData) {
    const botanist = this.botanists.find(bot => bot.id === id);
    if (botanist) {
      Object.assign(botanist, updateBotanistData);
      return botanist;
    }
    return null; 
  }

  async remove(id: number) {
    const index = this.botanists.findIndex(bot => bot.id === id);
    if (index !== -1) {
      const removedBotanist = this.botanists.splice(index, 1);
      return removedBotanist[0];
    }
    return null; 
  }
}

describe('BotanistsController', () => {
  let controller: BotanistsController;
  let service: BotanistsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BotanistsController],
      providers: [BotanistsService, {
        provide: 'BotanistRepository', 
        useClass: MockBotanistRepository,
      },],
    }).compile();

    controller = module.get<BotanistsController>(BotanistsController);
    service = module.get<BotanistsService>(BotanistsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a botanist', () => {
    const CreateBotanistDto: CreateBotanistDto = {name: 'vitor', email: 'vitor@gmail.com', institution: 'ifpi'};

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
  });
});
