import { Test, TestingModule } from '@nestjs/testing';
import { SpeciesController } from '../species.controller';
import { SpeciesService } from '../species.service';
import { CreateSpeciesDto } from '../dto/create-species.dto';
import { Species } from '../entities/species.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UpdateResult} from 'typeorm';

describe('SpeciesController', () => {
  let speciesController: SpeciesController;
  let speciesService: SpeciesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpeciesController],
      providers: [SpeciesService,
        {
          provide: getRepositoryToken(Species),
          useClass: Repository,
        },
      ],
    }).compile();

    speciesController = module.get<SpeciesController>(SpeciesController);
    speciesService = module.get<SpeciesService>(SpeciesService);
  });

  it('should be defined', () => {
    expect(speciesController).toBeDefined();
  });

    it('should create a new species', async () => {
      const CreateSpeciesDto: CreateSpeciesDto = {name: 'ana'};
      const createdSpecies = {id: 86, name: 'Pri', createdAt: new Date(), updatedAt: new Date()};
      jest.spyOn(speciesService, 'create').mockImplementation(() => Promise.resolve(createdSpecies));

      expect(await speciesController.create(CreateSpeciesDto)).toBe(createdSpecies);
    });

    it('should Find all return an array of species', async () => {
      const speciesList = []; 
      jest.spyOn(speciesService, 'findAll').mockImplementation(() => Promise.resolve(speciesList as Species[]));

      expect(await speciesController.findAll()).toBe(speciesList);
    });

    it('should return a species by ID', async () => {
      const id = 1; 
      const foundSpecies = {id: 32, name: 'titi', createdAt: new Date(), updatedAt: new Date()}; 
      jest.spyOn(speciesService, 'findOne').mockImplementation(() => Promise.resolve(foundSpecies as Species));

      expect(await speciesController.findOne(id)).toBe(foundSpecies);
    });

    it('should update a species by ID', async () => {
      const id = 1; 
      const updateSpeciesDto = {};
      const updateResult: UpdateResult = { affected: 1, raw: {}, generatedMaps: [] }; 
      jest.spyOn(speciesService, 'update').mockImplementation(() => Promise.resolve(updateResult));

      expect(await speciesController.update(id, updateSpeciesDto)).toBe(updateResult);
    });

  describe('remove', () => {
    it('should delete a species by ID', async () => {
      const id = 1;

      jest.spyOn(speciesService, 'remove').mockImplementation(() => undefined);

      expect(await speciesController.remove(id)).toBeUndefined();
    });
  });
});
