import { Test, TestingModule } from '@nestjs/testing';
import { BotanistsService } from './botanists.service';
import { CreateBotanistDto } from './dto/create-botanist.dto';
import { UpdateBotanistDto } from './dto/update-botanist.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Botanist } from './entities/botanist.entity';

describe('BotanistsService', () => {
  let service: BotanistsService;
  let botanistRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BotanistsService,
        {
          provide: getRepositoryToken(Botanist),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BotanistsService>(BotanistsService);
    botanistRepository = module.get(getRepositoryToken(Botanist));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a botanist', async () => {
      const createBotanistDto: CreateBotanistDto = {name: 'ana', email: 'aajdh', institution: 'if'};

      await service.create(createBotanistDto);

      expect(botanistRepository.save).toHaveBeenCalledWith(createBotanistDto);
    });
  });

  describe('findAll', () => {
    it('should find all botanists', async () => {
      const botanists = []; 
      botanistRepository.find.mockReturnValue(botanists);

      const result = await service.findAll();

      expect(result).toEqual(botanists);
    });
  });

  describe('findOne', () => {
    it('should find one botanist by ID', async () => {
      const botanistId = 1; 
      const botanist = {}; 
      botanistRepository.findOne.mockReturnValue(botanist);

      const result = await service.findOne(botanistId);

      expect(result).toEqual(botanist);
      expect(botanistRepository.findOne).toHaveBeenCalledWith({ id: botanistId });
    });
  });

  describe('update', () => {
    it('should update a botanist by ID', async () => {
      const botanistId = 1; 
      const updateBotanistDto: UpdateBotanistDto = {};

      await service.update(botanistId, updateBotanistDto);

      expect(botanistRepository.update).toHaveBeenCalledWith(botanistId, updateBotanistDto);
    });
  });

  describe('remove', () => {
    it('should remove a botanist by ID', async () => {
      const botanistId = 1;

      await service.remove(botanistId);

      expect(botanistRepository.delete).toHaveBeenCalledWith(botanistId);
    });
  });
});
