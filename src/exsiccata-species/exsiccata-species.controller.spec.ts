import { Test, TestingModule } from '@nestjs/testing';
import { ExsiccataSpeciesController } from './exsiccata-species.controller';
import { ExsiccataSpeciesService } from './exsiccata-species.service';
import { CreateExsiccataSpeciesDto } from './dto/create-exsiccata-species.dto';
import { UpdateExsiccataSpeciesDto } from './dto/update-exsiccata-species.dto';

describe('ExsiccataSpeciesController', () => {
  let exsiccataSpeciesController: ExsiccataSpeciesController;
  const exsiccataSpeciesService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExsiccataSpeciesController],
      providers: [ExsiccataSpeciesService],
    })
    .overrideProvider(ExsiccataSpeciesService)
    .useValue(exsiccataSpeciesService)
    .compile();

    exsiccataSpeciesController = module.get<ExsiccataSpeciesController>(ExsiccataSpeciesController);
  });

  it('should be defined', () => {
    expect(exsiccataSpeciesController).toBeDefined();
  });

  describe('create', () => {
    it('should create an Exsiccata Species', async () => {
      const createExsiccataSpeciesDto: CreateExsiccataSpeciesDto = { };
      const mockExsiccataSpecies = {};
      exsiccataSpeciesService.create.mockReturnValue(mockExsiccataSpecies);

      const result = await exsiccataSpeciesController.create(createExsiccataSpeciesDto);

      expect(exsiccataSpeciesService.create).toHaveBeenCalledWith(createExsiccataSpeciesDto);
      expect(result).toEqual(mockExsiccataSpecies);
    });
  });

  describe('findAll', () => {
    it('should return an array of Exsiccata Species', async () => {
      const mockExsiccataSpeciesArray = [];
      exsiccataSpeciesService.findAll.mockReturnValue(mockExsiccataSpeciesArray);

      const result = await exsiccataSpeciesController.findAll();

      expect(result).toEqual(mockExsiccataSpeciesArray);
    });
  });

  describe('findOne', () => {
    it('should return an Exsiccata Species by ID', async () => {
      const id = 1; 
      const mockExsiccataSpecies = { };
      exsiccataSpeciesService.findOne.mockReturnValue(mockExsiccataSpecies);

      const result = await exsiccataSpeciesController.findOne(id);

      expect(exsiccataSpeciesService.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockExsiccataSpecies);
    });
  });

  describe('update', () => {
    it('should update an Exsiccata Species by ID', async () => {
      const id = 1; 
      const updateExsiccataSpeciesDto: UpdateExsiccataSpeciesDto = { };
      exsiccataSpeciesService.update.mockResolvedValue({ success: true });

      const result = await exsiccataSpeciesController.update(id, updateExsiccataSpeciesDto);

      expect(exsiccataSpeciesService.update).toHaveBeenCalledWith(id, updateExsiccataSpeciesDto);
      expect(result).toEqual({ success: true });
    });
  });

  describe('remove', () => {
    it('should remove an Exsiccata Species by ID', async () => {
      const id = 1; 
      exsiccataSpeciesService.remove.mockResolvedValue({ success: true });

      const result = await exsiccataSpeciesController.remove(id);

      expect(exsiccataSpeciesService.remove).toHaveBeenCalledWith(id);
      expect(result).toEqual({ success: true });
    });
  });
});
