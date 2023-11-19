import { Test, TestingModule } from '@nestjs/testing';
import { LocationsController } from './locations.controller';
import { LocationsService } from './locations.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Location } from './entities/location.entity';

describe('LocationsController', () => {
  let controller: LocationsController;
  let service: LocationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationsController],
      providers: [LocationsService,
        {
          provide: getRepositoryToken(Location),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<LocationsController>(LocationsController);
    service = module.get<LocationsService>(LocationsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a location', async () => {
      const createLocationDto= {city: 'a.b', state: 'pi'};
      const createdLocation = {id: 2, city: 'the',state: 'pi' }; 

      jest.spyOn(service, 'create').mockImplementation(() => Promise.resolve(createdLocation));

      expect(await controller.create(createLocationDto)).toBe(createdLocation);
    });
  });

  describe('findAll', () => {
    it('should return a list of locations', async () => {
      const locations = []; 
      jest.spyOn(service, 'findAll').mockImplementation(() => Promise.resolve (locations as Location[]));

      expect(await controller.findAll()).toBe(locations);
    });
  });

    it('should update a location', async () => {
      const id = 1; 
      const updateLocationDto = {};
      const updatedResult: UpdateResult = {affected: 1, raw: {}, generatedMaps: [] };
      jest.spyOn(service, 'update').mockImplementation(() => Promise.resolve(updatedResult));

      await controller.update(id, updateLocationDto);

      expect(service.update).toHaveBeenCalledWith(id, updateLocationDto);
    });

  describe('remove', () => {
    it('should delete a location', async () => {
      const id = 1; 

      jest.spyOn(service, 'remove').mockImplementation(() => null); 

      expect(await controller.remove(id)).toBe(null);
    });
  });

    it('should return a list of cities by state name', async () => {
      const stateName = 'ExampleState';
      const cities = []; 
      jest.spyOn(service, 'findAllCitiesByStateName').mockImplementation(() => Promise.resolve(cities as Location[]));

      expect(await controller.findAllCitysByStateName(stateName)).toBe(cities);
    });

    it('should return a list of states', async () => {
      const states = []; 
      jest.spyOn(service, 'findAllStates').mockImplementation(() =>  Promise.resolve(states as Location[]));

      expect(await controller.findAllStates()).toBe(states);
    });

    it('should return a specific location by ID', async () => {
      const id = 1; 
      const location = {}; 
      jest.spyOn(service, 'findOne').mockImplementation(() => Promise.resolve(location as Location));

      expect(await controller.findOne(id)).toBe(location);
    });
});
