import { Test, TestingModule } from '@nestjs/testing';
import { ExsiccataService } from './exsiccata.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Exsiccata } from './entities/exsiccata.entity';
import { NotFoundException } from '@nestjs/common';

describe('ExsiccataService', () => {
  let exsiccataService: ExsiccataService;
  const exsiccataRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    find: jest.fn(),
    createQueryBuilder: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExsiccataService,
        {
          provide: getRepositoryToken(Exsiccata),
          useValue: exsiccataRepository,
        },
      ],
    }).compile();

    exsiccataService = module.get<ExsiccataService>(ExsiccataService);
  });

  it('should be defined', () => {
    expect(exsiccataService).toBeDefined();
  });

  describe('create', () => {
    it('should create an Exsiccata', async () => {
      const createExsiccataDto = { };
      const mockExsiccata = {};
      exsiccataRepository.create.mockReturnValue(mockExsiccata);

      const result = await exsiccataService.create(createExsiccataDto);

      expect(exsiccataRepository.create).toHaveBeenCalledWith(createExsiccataDto);
      expect(exsiccataRepository.save).toHaveBeenCalledWith(mockExsiccata);
      expect(result).toEqual(mockExsiccata);
    });

    it('should throw NotFoundException when family not found', async () => {
      exsiccataRepository.create.mockReturnValue({});
      exsiccataRepository.findOne.mockResolvedValue(undefined);

      const createExsiccataDto = {};

      try {
        await exsiccataService.create(createExsiccataDto);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('findAll', () => {
    it('should return an array of Exsiccata', async () => {
      const mockExsiccataArray = [];
      exsiccataRepository.find.mockResolvedValue(mockExsiccataArray);

      const result = await exsiccataService.findAll();

      expect(result).toEqual(mockExsiccataArray);
    });
  });

  describe('findAllPaginateWithFilter', () => {
    it('should return a paginated list of Exsiccata with filters', async () => {
      const filterParams = {};
      const options = { page: 1, limit: 10 }; 
      const mockPaginatedExsiccata = { items: [], meta: { totalItems: 1, itemCount: 1 } };
      exsiccataRepository.createQueryBuilder.mockReturnValue({
        andWhere: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(mockPaginatedExsiccata.items),
      });

      const result = await exsiccataService.findAllPaginateWithFilter(filterParams, options);

      expect(exsiccataRepository.createQueryBuilder).toHaveBeenCalled();
      expect(result).toEqual(mockPaginatedExsiccata);
    });
  });

  describe('findOne', () => {
    it('should return an Exsiccata by ID', async () => {
      const id = 1; 
      const mockExsiccata = { };
      exsiccataRepository.findOne.mockResolvedValue(mockExsiccata);

      const result = await exsiccataService.findOne(id);

      expect(exsiccataRepository.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockExsiccata);
    });

    it('should throw NotFoundException when Exsiccata is not found', async () => {
      exsiccataRepository.findOne.mockResolvedValue(undefined);
      const id = 999; 

      try {
        await exsiccataService.findOne(id);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('update', () => {
    it('should update an Exsiccata by ID', async () => {
      const id = 1;
      const updateExsiccataDto = { };
      exsiccataRepository.update.mockResolvedValue({ affected: 1 });

      const result = await exsiccataService.update(id, updateExsiccataDto);

      expect(exsiccataRepository.update).toHaveBeenCalledWith(id, updateExsiccataDto);
      expect(result).toEqual({ success: true });
    });

    it('should throw NotFoundException when Exsiccata is not found for update', async () => {
      exsiccataRepository.update.mockResolvedValue({ affected: 0 });
      const id = 999; 
      const updateExsiccataDto = { };

      try {
        await exsiccataService.update(id, updateExsiccataDto);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('remove', () => {
    it('should remove an Exsiccata by ID', async () => {
      const id = 1; 
      exsiccataRepository.delete.mockResolvedValue({ affected: 1 });

      const result = await exsiccataService.remove(id);

      expect(exsiccataRepository.delete).toHaveBeenCalledWith(id);
      expect(result).toEqual({ success: true });
    });

    it('should throw NotFoundException when Exsiccata is not found for removal', async () => {
      exsiccataRepository.delete.mockResolvedValue({ affected: 0 });
      const id = 999;

      try {
        await exsiccataService.remove(id);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});