import { Test, TestingModule } from '@nestjs/testing';
import { SpeciesController } from '../species.controller';
import { SpeciesService } from '../species.service';
import { CreateSpeciesDto } from '../dto/create-species.dto';
import { UpdateSpeciesDto } from '../dto/update-species.dto';


describe('SpeciesController', () => {
  let speciesController: SpeciesController;
  let speciesService: SpeciesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpeciesController],
      providers: [SpeciesService],
    }).compile();

    speciesController = module.get<SpeciesController>(SpeciesController);
    speciesService = module.get<SpeciesService>(SpeciesService);
  });

  it('should be defined', () => {
    expect(speciesController).toBeDefined();
  });

  describe('create', () => {
    it('should create a new species', async () => {
      const CreateSpeciesDto: CreateSpeciesDto = {name: 'ana'};
      const createdSpecies = {};

      jest.spyOn(speciesService, 'create').mockImplementation(() => createdSpecies);

      expect(await speciesController.create(CreateSpeciesDto)).toBe(createdSpecies);
    });
  });

  describe('findAll', () => {
    it('should return an array of species', async () => {
      const speciesList = []; 

      jest.spyOn(speciesService, 'findAll').mockImplementation(() => speciesList);

      expect(await speciesController.findAll()).toBe(speciesList);
    });
  });

  describe('findOne', () => {
    it('should return a species by ID', async () => {
      const id = 1; 
      const foundSpecies = {}; 

      jest.spyOn(speciesService, 'findOne').mockImplementation(() => foundSpecies);

      expect(await speciesController.findOne(id)).toBe(foundSpecies);
    });
  });

  describe('update', () => {
    it('should update a species by ID', async () => {
      const id = 1; 
      const updateSpeciesDto: UpdateSpeciesDto = {};
      const updatedSpecies = {}; 

      jest.spyOn(speciesService, 'update').mockImplementation(() => updatedSpecies);

      expect(await speciesController.update(id, updateSpeciesDto)).toBe(updatedSpecies);
    });
  });

  describe('remove', () => {
    it('should delete a species by ID', async () => {
      const id = 1;

      jest.spyOn(speciesService, 'remove').mockImplementation(() => undefined);

      expect(await speciesController.remove(id)).toBeUndefined();
    });
  });
});
