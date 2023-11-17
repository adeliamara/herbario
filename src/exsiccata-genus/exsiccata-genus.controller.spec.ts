import { Test, TestingModule } from '@nestjs/testing';
import { ExsiccataGenusController } from './exsiccata-genus.controller';
import { ExsiccataGenusService } from './exsiccata-genus.service';
import { CreateExsiccataGenusDto } from './dto/create-exsiccata-genus.dto';
import { UpdateExsiccataGenusDto } from './dto/update-exsiccata-genus.dto';

describe('ExsiccataGenusController', () => {
  let exsiccataGenusController: ExsiccataGenusController;
  const exsiccataGenusService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExsiccataGenusController],
      providers: [ExsiccataGenusService],
    })
    .overrideProvider(ExsiccataGenusService)
    .useValue(exsiccataGenusService)
    .compile();

    exsiccataGenusController = module.get<ExsiccataGenusController>(ExsiccataGenusController);
  });

  it('should be defined', () => {
    expect(exsiccataGenusController).toBeDefined();
  });

  describe('create', () => {
    it('should create an Exsiccata Genus', async () => {
      const createExsiccataGenusDto: CreateExsiccataGenusDto = {};
      const mockExsiccataGenus = { };
      exsiccataGenusService.create.mockReturnValue(mockExsiccataGenus);

      const result = await exsiccataGenusController.create(createExsiccataGenusDto);

      expect(exsiccataGenusService.create).toHaveBeenCalledWith(createExsiccataGenusDto);
      expect(result).toEqual(mockExsiccataGenus);
    });
  });

  describe('findAll', () => {
    it('should return an array of Exsiccata Genus', async () => {
      const mockExsiccataGenusArray = [];
      exsiccataGenusService.findAll.mockReturnValue(mockExsiccataGenusArray);

      const result = await exsiccataGenusController.findAll();

      expect(result).toEqual(mockExsiccataGenusArray);
    });
  });

  describe('findOne', () => {
    it('should return an Exsiccata Genus by ID', async () => {
      const id = 1; 
      const mockExsiccataGenus = {};
      exsiccataGenusService.findOne.mockReturnValue(mockExsiccataGenus);

      const result = await exsiccataGenusController.findOne(id);

      expect(exsiccataGenusService.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockExsiccataGenus);
    });
  });

  describe('update', () => {
    it('should update an Exsiccata Genus by ID', async () => {
      const id = 1; 
      const updateExsiccataGenusDto: UpdateExsiccataGenusDto = { };
      exsiccataGenusService.update.mockResolvedValue({ success: true });

      const result = await exsiccataGenusController.update(id, updateExsiccataGenusDto);

      expect(exsiccataGenusService.update).toHaveBeenCalledWith(id, updateExsiccataGenusDto);
      expect(result).toEqual({ success: true });
    });
  });

  describe('remove', () => {
    it('should remove an Exsiccata Genus by ID', async () => {
      const id = 1; 
      exsiccataGenusService.remove.mockResolvedValue({ success: true });

      const result = await exsiccataGenusController.remove(id);

      expect(exsiccataGenusService.remove).toHaveBeenCalledWith(id);
      expect(result).toEqual({ success: true });
    });
  });
});
