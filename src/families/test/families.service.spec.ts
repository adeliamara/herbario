import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FamiliesService } from '../families.service';
import { Family } from '../entities/family.entity';
import { CreateFamilyDto } from '../dto/create-family.dto';
import { UpdateFamilyDto } from '../dto/update-family.dto';

describe('FamiliesService', () => {
  let familiesService: FamiliesService;
  const familyRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FamiliesService,
        {
          provide: getRepositoryToken(Family),
          useValue: familyRepository,
        },
      ],
    }).compile();

    familiesService = module.get<FamiliesService>(FamiliesService);
  });

  it('should be defined', () => {
    expect(familiesService).toBeDefined();
  });

  describe('create', () => {
    it('should create a Family', async () => {
      const createFamilyDto: CreateFamilyDto = { name: 'Test Family' };
      const mockFamily = { id: 1, name: 'Test Family' };
      familyRepository.save.mockResolvedValue(mockFamily);

      const result = await familiesService.create(createFamilyDto);

      expect(familyRepository.save).toHaveBeenCalledWith(createFamilyDto);
      expect(result).toEqual(mockFamily);
    });
  });

  describe('findAll', () => {
    it('should return an array of Families', async () => {
      const mockFamiliesArray = [{ id: 1, name: 'Family 1' }, { id: 2, name: 'Family 2' }];
      familyRepository.find.mockResolvedValue(mockFamiliesArray);

      const result = await familiesService.findAll();

      expect(result).toEqual(mockFamiliesArray);
    });
  });

  describe('findOne', () => {
    it('should return a specific Family by ID', async () => {
      const id = 1;
      const mockFamily = { id: 1, name: 'Test Family' };
      familyRepository.findOne.mockResolvedValue(mockFamily);

      const result = await familiesService.findOne(id);

      expect(result).toEqual(mockFamily);
    });
  });

  describe('update', () => {
    it('should update a Family by ID', async () => {
      const id = 1;
      const updateFamilyDto: UpdateFamilyDto = { name: 'Updated Family' };
      familyRepository.update.mockResolvedValue({ affected: 1 });

      const result = await familiesService.update(id, updateFamilyDto);

      expect(familyRepository.update).toHaveBeenCalledWith(id, updateFamilyDto);
    });
  });

  describe('remove', () => {
    it('should remove a Family by ID', async () => {
      const id = 1;
      familyRepository.delete.mockResolvedValue({ affected: 1 });

      const result = await familiesService.remove(id);

      expect(familyRepository.delete).toHaveBeenCalledWith(id);
    });
  });
});
