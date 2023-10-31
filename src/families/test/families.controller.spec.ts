import { Test, TestingModule } from '@nestjs/testing';
import { FamiliesController } from '../families.controller';
import { FamiliesService } from '../families.service';
import { CreateFamilyDto } from '../dto/create-family.dto';
import { UpdateFamilyDto } from '../dto/update-family.dto';


describe('FamiliesController', () => {
  let familiesController: FamiliesController;
  const familiesService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FamiliesController],
      providers: [FamiliesService],
    })
    .overrideProvider(FamiliesService)
    .useValue(familiesService)
    .compile();

    familiesController = module.get<FamiliesController>(FamiliesController);
  });

  it('should be defined', () => {
    expect(familiesController).toBeDefined();
  });
  describe('create', () => {
    it('should create a Family', async () => {
      const CreateFamilyDto: CreateFamilyDto = {name: 'ana'};
      const mockFamily = {};
      familiesService.create.mockReturnValue(mockFamily);

      const result = await familiesController.create(CreateFamilyDto);

      expect(familiesService.create).toHaveBeenCalledWith(CreateFamilyDto);
      expect(result).toEqual(mockFamily);
    });
  });

  describe('findAll', () => {
    it('should return an array of Families', async () => {
      const mockFamiliesArray = [];
      familiesService.findAll.mockReturnValue(mockFamiliesArray);

      const result = await familiesController.findAll();

      expect(result).toEqual(mockFamiliesArray);
    });
  });

  describe('findOne', () => {
    it('should return a Family by ID', async () => {
      const id = 1; 
      const mockFamily = {};
      familiesService.findOne.mockReturnValue(mockFamily);

      const result = await familiesController.findOne(id);

      expect(familiesService.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockFamily);
    });
  });

  describe('update', () => {
    it('should update a Family by ID', async () => {
      const id = 1; 
      const updateFamilyDto: UpdateFamilyDto = { };
      familiesService.update.mockResolvedValue({ success: true });

      const result = await familiesController.update(id, updateFamilyDto);

      expect(familiesService.update).toHaveBeenCalledWith(id, updateFamilyDto);
      expect(result).toEqual({ success: true });
    });
  });

  describe('remove', () => {
    it('should remove a Family by ID', async () => {
      const id = 1; 
      familiesService.remove.mockResolvedValue({ success: true });

      const result = await familiesController.remove(id);

      expect(familiesService.remove).toHaveBeenCalledWith(id);
      expect(result).toEqual({ success: true });
    });
  });
});
