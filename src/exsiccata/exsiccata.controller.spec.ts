import { Test, TestingModule } from '@nestjs/testing';
import { ExsiccataController } from './exsiccata.controller';
import { ExsiccataService } from './exsiccata.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Exsiccata } from './entities/exsiccata.entity';

describe('ExsiccataController', () => {
  let exsiccataController: ExsiccataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExsiccataController],
      providers: [
        ExsiccataService,
        {
          provide: getRepositoryToken(Exsiccata),
          useValue: {},
        },
      ],
    }).compile();

    exsiccataController = module.get<ExsiccataController>(ExsiccataController);
  });

  it('should be defined', () => {
    expect(exsiccataController).toBeDefined();
  });

  it('should create an Exsiccata', () => {
    const createExsiccataDto = {scientificName: 'clorro', collectionDate: new Date(), latitude:2, longitude:12,
    locationDescription: '', familyId: 22, speciesId: 11, genusId: 22,
    collectorId: 8, collectionNumberPerCollector: 21, locationId: 222, environmentId: 432,
    determinatorId: 33, createdAt: new Date(), updatedAt: new Date(), deletedAt: new Date()};
    const createdExsiccata = {};
    jest.spyOn(exsiccataController, 'create').mockImplementation(() => createdExsiccata[Symbol.toStringTag]);

    expect(exsiccataController.create(createExsiccataDto)).toBe(createdExsiccata);
  });

  it('should find an Exsiccata by ID', () => {
    const id = 1; 
    const foundExsiccata = {}; 
    jest.spyOn(exsiccataController, 'findOne').mockImplementation(() => foundExsiccata[Symbol.toStringTag]);

    expect(exsiccataController.findOne(id)).toBe(foundExsiccata);
  });

  it('should update an Exsiccata by ID', () => {
    const id = 1; 
    const updateExsiccataDto = {};
    const updatedExsiccata = {}; 
    jest.spyOn(exsiccataController, 'update').mockImplementation(() => updatedExsiccata[Symbol.toStringTag]);

    expect(exsiccataController.update(id, updateExsiccataDto)).toBe(updatedExsiccata);
  });

  it('should remove an Exsiccata by ID', () => {
    const id = 1; 
    const removedExsiccata = {};
    jest.spyOn(exsiccataController, 'remove').mockImplementation(() => removedExsiccata[Symbol.toStringTag]);

    expect(exsiccataController.remove(id)).toBe(removedExsiccata);
  });
});
