import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SpeciesService } from '../species.service';
import { Species } from '../entities/species.entity';

describe('SpeciesService', () => {
  let speciesService: SpeciesService;
  let speciesRepository: Repository<Species>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SpeciesService,
        {
          provide: getRepositoryToken(Species),
          useClass: Repository,
        },
      ],
    }).compile();

    speciesService = module.get<SpeciesService>(SpeciesService);
    speciesRepository = module.get<Repository<Species>>(getRepositoryToken(Species));
  });

  it('should be defined', () => {
    expect(speciesService).toBeDefined();
  });

  describe('create', () => {
    it('should create a new species', async () => {
      const createSpeciesDto = {name: 'Test Species'};
      const savedSpecies = {id: 1, name: 'Test Species', createdAt: new Date(), updatedAt: new Date()};

      jest.spyOn(speciesRepository, 'save').mockResolvedValue(savedSpecies);

      const result = await speciesService.create(createSpeciesDto);

      expect(result).toEqual(savedSpecies);
    });
  });

  describe('findAll', () => {
    it('should return an array of species', async () => {
      const speciesList = [
        {
          id: 1, name: 'Species 1', specie: 'fofo', createdAt: new Date(), updatedAt: new Date()
        },
        {
          id: 2, name: 'Species 2', specie: 'fofos', createdAt: new Date(), updatedAt: new Date()
        },
      ];

      jest.spyOn(speciesRepository, 'find').mockResolvedValue(speciesList);

      const result = await speciesService.findAll();

      expect(result).toEqual(speciesList);
    });
  });

  describe('findOne', () => {
    it('should return a species by ID', async () => {
      const id = 1;
      const foundSpecies = {
        id: 1,
        name: 'Found Species', createdAt: new Date(), updatedAt: new Date()
      };

      jest.spyOn(speciesRepository, 'findOne').mockResolvedValue(foundSpecies);

      const result = await speciesService.findOne(id);

      expect(result).toEqual(foundSpecies);
    });
  });

  describe('update', () => {
    it('should update a species', async () => {
      const speciesId = 1;
      const updateSpeciesDto = {name: 'Updated Species' };
      const updatedSpecies = new Species();
  
      jest.spyOn(speciesRepository, 'update').mockResolvedValue({ affected: 1, raw: [],  generatedMaps: []});
  
      const result = await speciesService.update(speciesId, updateSpeciesDto);
      expect(result).toEqual(updatedSpecies);
    });
  });

  describe('remove', () => {
    it('should delete a species by ID', async () => {
      const id = 1;

      jest.spyOn(speciesRepository, 'delete').mockResolvedValue({ affected: 1, raw: []});

      const result = await speciesService.remove(id);

      expect(result).toEqual({ affected: 1 });
    });
  });
});
