import { Test, TestingModule } from '@nestjs/testing';
import { ExsiccataFamilyService } from './exsiccata-family.service';
import { CreateExsiccataFamilyDto } from './dto/create-exsiccata-family.dto';
import { UpdateExsiccataFamilyDto } from './dto/update-exsiccata-family.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ExsiccataFamily } from './entities/exsiccata-family.entity';

describe('ExsiccataFamilyService', () => {
  let exsiccataFamilyService: ExsiccataFamilyService;
  const exsiccataFamilyRepository = {
    save: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExsiccataFamilyService,
        {
          provide: getRepositoryToken(ExsiccataFamily),
          useValue: exsiccataFamilyRepository,
        },
      ],
    }).compile();

    exsiccataFamilyService = module.get<ExsiccataFamilyService>(ExsiccataFamilyService);
  });

  it('should be defined', () => {
    expect(exsiccataFamilyService).toBeDefined();
  });

  describe('create', () => {
    it('should create an Exsiccata Family', async () => {
      const createExsiccataFamilyDto: CreateExsiccataFamilyDto = { /* your test data */ };
      const mockExsiccataFamily = { /* your mock Exsiccata Family data */ };
      exsiccataFamilyRepository.save.mockReturnValue(mockExsiccataFamily);

      const result = await exsiccataFamilyService.create(createExsiccataFamilyDto);

      expect(exsiccataFamilyRepository.save).toHaveBeenCalledWith(createExsiccataFamilyDto);
      expect(result).toEqual(mockExsiccataFamily);
    });
  });

  describe('findAll', () => {
    it('should return an array of Exsiccata Families', async () => {
      const mockExsiccataFamilyArray = [/* your mock Exsiccata Family data */];
      exsiccataFamilyRepository.find.mockReturnValue(mockExsiccataFamilyArray);

      const result = await exsiccataFamilyService.findAll();

      expect(result).toEqual(mockExsiccataFamilyArray);
    });
  });

  describe('update', () => {
    it('should update an Exsiccata Family by ID', async () => {
      const id = 1; // Replace with a valid ID
      const updateExsiccataFamilyDto: UpdateExsiccataFamilyDto = { /* your update DTO data */ };
      exsiccataFamilyRepository.update.mockResolvedValue({ affected: 1 });

      const result = await exsiccataFamilyService.update(id, updateExsiccataFamilyDto);

      expect(exsiccataFamilyRepository.update).toHaveBeenCalledWith(id, updateExsiccataFamilyDto);
      expect(result).toEqual({ success: true });
    });
  });

  describe('remove', () => {
    it('should remove an Exsiccata Family by ID', async () => {
      const id = 1; // Replace with a valid ID
      exsiccataFamilyRepository.delete.mockResolvedValue({ affected: 1 });

      const result = await exsiccataFamilyService.remove(id);

      expect(exsiccataFamilyRepository.delete).toHaveBeenCalledWith(id);
      expect(result).toEqual({ success: true });
    });
  });
});
