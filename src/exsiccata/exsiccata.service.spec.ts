import { Test, TestingModule } from '@nestjs/testing';
import { ExsiccataService } from './exsiccata.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Exsiccata } from './entities/exsiccata.entity';
import { NotFoundException } from '@nestjs/common';
import { FamiliesService } from '../families/families.service';
import { SpeciesService } from '../species/species.service';
import { GenusService } from '../genus/genus.service';
import { BotanistsService } from '../botanists/botanists.service';
import { LocationsService } from '../locations/locations.service';
import { EnvironmentsService } from '../environments/environments.service';
import { Family } from '../families/entities/family.entity';
import { Repository } from 'typeorm';
import { Species } from '../species/entities/species.entity';
import { Genus } from '../genus/entities/genus.entity';
import { Botanist } from '../botanists/entities/botanist.entity';
import { Environment } from '../environments/entities/environment.entity';
import { Location } from "../locations/entities/location.entity";

jest.mock('../families/families.service');

describe('ExsiccataService', () => {
  let exsiccataService: ExsiccataService;
  let mockExsiccataRepository;
  let familiesService: FamiliesService;
  const exsiccataRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    find: jest.fn(),
    createQueryBuilder: jest.fn().mockReturnThis(),
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    getMany: jest.fn().mockReturnValue([]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExsiccataService,
        SpeciesService,
        FamiliesService,
        GenusService,
        BotanistsService,
        LocationsService,
        EnvironmentsService,
        {
          provide: getRepositoryToken(Exsiccata),
          useValue: exsiccataRepository,
        },
        {
          provide: getRepositoryToken(Species), 
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Genus), 
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Botanist), 
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Location), 
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Environment), 
          useClass: Repository,
        },
      ],
    }).compile();

    exsiccataService = module.get<ExsiccataService>(ExsiccataService);
    familiesService = module.get<FamiliesService>(FamiliesService);
    
  });

  it('should be defined', () => {
    expect(exsiccataService).toBeDefined();
  });

  describe('create', () => {
    it('should create an Exsiccata', async () => {
      const mockExsiccata = new Exsiccata();
      mockExsiccataRepository.create.mockReturnValue(mockExsiccata);
    });

    it('should throw NotFoundException when family not found', async () => {
      jest.spyOn(familiesService, 'findOne').mockResolvedValue(null);

      const createExsiccataDto = {scientificName: 'flor', collectionDate: new Date(), latitude: 123, longitude: 1244, 
      locationDescription: 'terra', familyId: 21, speciesId: 12, genusId: 33, collectorId: 2, 
      collectionNumberPerCollector: 9, locationId: 76, environmentId: 5, determinatorId: 6, createdAt: new Date(), 
      updatedAt: new Date(), deletedAt: new Date()};

      await expect(exsiccataService.create(createExsiccataDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return FindAll array of Exsiccata', async () => {
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
    it('should FindOne an Exsiccata by ID', async () => {
      const id = 1; 
      const mockExsiccata = {};
      exsiccataRepository.findOne.mockResolvedValue(mockExsiccata);
  
      const result = await exsiccataService.findOne(id);
  
      expect(result).toEqual(mockExsiccata);
    });
  
    it('should throw NotFoundException when Exsiccata is not found', async () => {
      exsiccataRepository.findOne.mockRejectedValue({}); 
  
      await expect(exsiccataService.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update an Exsiccata by ID', async () => {
      const id = 1;
      const updateExsiccataDto = { };
      exsiccataRepository.update.mockResolvedValue({ affected: 1 });

      const result = await exsiccataService.update(id, updateExsiccataDto);

      expect(exsiccataRepository.update).toHaveBeenCalledWith(id, updateExsiccataDto);
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