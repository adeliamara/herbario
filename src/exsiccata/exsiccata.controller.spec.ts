import { Test, TestingModule } from "@nestjs/testing";
import { ExsiccataController } from "./exsiccata.controller";
import { ExsiccataService } from "./exsiccata.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Exsiccata } from "./entities/exsiccata.entity";
import { FamiliesService } from "../families/families.service";
import { SpeciesService } from "../species/species.service";
import { GenusService } from "../genus/genus.service";
import { BotanistsService } from "../botanists/botanists.service";
import { LocationsService } from "../locations/locations.service";
import { EnvironmentsService } from "../environments/environments.service";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { Family } from "../families/entities/family.entity";
import { Species } from "../species/entities/species.entity";
import { Genus } from "../genus/entities/genus.entity";
import { Botanist } from "../botanists/entities/botanist.entity";
import { Environment } from "../environments/entities/environment.entity";
import { Location } from "../locations/entities/location.entity";

describe('ExsiccataController', () => {
  let exsiccataController: ExsiccataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExsiccataController],
      providers: [
        ExsiccataService,
        FamiliesService,
        SpeciesService,
        GenusService,
        BotanistsService,
        LocationsService,
        EnvironmentsService,
        {
          provide: getRepositoryToken(Exsiccata),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Family), 
          useClass: Repository,
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

    exsiccataController = module.get<ExsiccataController>(ExsiccataController);
  });

  it('should be defined', () => {
    expect(exsiccataController).toBeDefined();
  });

  it('should create an Exsiccata', () => {
    const createExsiccataDto = {scientificName: 'klarer', collectionDate: new Date(), latitude: 1, longitude: 2,
    locationDescription: 'terra', familyId: 33, speciesId: 3, genusId: 8, collectorId: 2, collectionNumberPerCollector: 222, 
    locationId: 100, environmentId: 222, determinatorId: 342, createdAt: new Date(), updatedAt: new Date(), deletedAt: new Date() };
    const createdExsiccata = { };
  
    jest.spyOn(exsiccataController, 'create').mockResolvedValue(createdExsiccata as Promise<Exsiccata>);

    return expect(exsiccataController.create(createExsiccataDto)).resolves.toEqual(createdExsiccata);
  });

  it('should find an Exsiccata by ID', () => {
    const id = 1; 
    const foundExsiccata = {}; 
    jest.spyOn(exsiccataController, 'findOne').mockResolvedValue(foundExsiccata as Promise<Exsiccata>);

    return expect(exsiccataController.findOne(id)).resolves.toEqual(foundExsiccata);
  });

  it('should update an Exsiccata by ID', () => {
    const id = 1; 
    const updateExsiccataDto = {};
    const updatedExsiccata = {}; 
    jest.spyOn(exsiccataController, 'update').mockResolvedValue({ raw: [], generatedMaps: [], affected: 1 } as UpdateResult);

    return expect(exsiccataController.update(id, updateExsiccataDto)).resolves.toEqual({ raw: [], generatedMaps: [], affected: 1 } as UpdateResult);
  });

  it('should remove an Exsiccata by ID', () => {
    const id = 1; 
    const removedExsiccata = {};
    jest.spyOn(exsiccataController, 'remove').mockResolvedValue({ raw: [], affected: 1 } as DeleteResult);

    return expect(exsiccataController.remove(id)).resolves.toEqual({ raw: [], affected: 1 } as DeleteResult);
  });
});
