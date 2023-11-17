import { Test, TestingModule } from '@nestjs/testing';
import { ExsiccataFamilyController } from './exsiccata-family.controller';
import { ExsiccataFamilyService } from './exsiccata-family.service';
import { CreateExsiccataFamilyDto } from './dto/create-exsiccata-family.dto';
import { UpdateExsiccataFamilyDto } from './dto/update-exsiccata-family.dto';

describe('ExsiccataFamilyController', () => {
  let exsiccataFamilyController: ExsiccataFamilyController;
  const exsiccataFamilyService = {
    create: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExsiccataFamilyController],
      providers: [ExsiccataFamilyService],
    })
    .overrideProvider(ExsiccataFamilyService)
    .useValue(exsiccataFamilyService)
    .compile();

    exsiccataFamilyController = module.get<ExsiccataFamilyController>(ExsiccataFamilyController);
  });

  it('should be defined', () => {
    expect(exsiccataFamilyController).toBeDefined();
  });

  describe('create', () => {
    it('should create an Exsiccata Family', async () => {
      const createExsiccataFamilyDto: CreateExsiccataFamilyDto = {};
      const mockExsiccataFamily = {};
      exsiccataFamilyService.create.mockReturnValue(mockExsiccataFamily);

      const result = await exsiccataFamilyController.create(createExsiccataFamilyDto);

      expect(exsiccataFamilyService.create).toHaveBeenCalledWith(createExsiccataFamilyDto);
      expect(result).toEqual(mockExsiccataFamily);
    });
  });

  describe('findAll', () => {
    it('should return an array of Exsiccata Families', async () => {
      const mockExsiccataFamilyArray = [];
      exsiccataFamilyService.findAll.mockReturnValue(mockExsiccataFamilyArray);

      const result = await exsiccataFamilyController.findAll();

      expect(result).toEqual(mockExsiccataFamilyArray);
    });
  });

  describe('update', () => {
    it('should update an Exsiccata Family by ID', async () => {
      const id = 1;
      const updateExsiccataFamilyDto: UpdateExsiccataFamilyDto = {};
      exsiccataFamilyService.update.mockReturnValue({ success: true });

      const result = await exsiccataFamilyController.update(id, updateExsiccataFamilyDto);

      expect(exsiccataFamilyService.update).toHaveBeenCalledWith(id, updateExsiccataFamilyDto);
      expect(result).toEqual({ success: true });
    });
  });

  describe('remove', () => {
    it('should remove an Exsiccata Family by ID', async () => {
      const id = 1;
      exsiccataFamilyService.remove.mockReturnValue({ success: true });

      const result = await exsiccataFamilyController.remove(id);

      expect(exsiccataFamilyService.remove).toHaveBeenCalledWith(id);
      expect(result).toEqual({ success: true });
    });
  });
});
