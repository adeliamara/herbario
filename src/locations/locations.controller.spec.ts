import { Test, TestingModule } from '@nestjs/testing';
import { LocationsController } from './locations.controller';
import { LocationsService } from './locations.service';

describe('LocationsController', () => {
  let controller: LocationsController;
  let service: LocationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationsController],
      providers: [LocationsService],
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
      const createdLocation = {}; 

      jest.spyOn(service, 'create').mockImplementation(() => createdLocation[Symbol.toStringTag]);

      expect(await controller.create(createLocationDto)).toBe(createdLocation);
    });
  });

  describe('findAll', () => {
    it('should return a list of locations', async () => {
      const locations = []; 

      jest.spyOn(service, 'findAll').mockImplementation(() => locations[Symbol.toStringTag]);

      expect(await controller.findAll()).toBe(locations);
    });
  });

  describe('update', () => {
    it('should update a location', async () => {
      const id = 1; 
      const updateLocationDto = {
      };
      const updatedLocation = {};

      jest.spyOn(service, 'update').mockImplementation(() => updatedLocation[Symbol.toStringTag]);

      expect(await controller.update(id, updateLocationDto)).toBe(updatedLocation);
    });
  });

  describe('remove', () => {
    it('should delete a location', async () => {
      const id = 1; 

      jest.spyOn(service, 'remove').mockImplementation(() => null); 

      expect(await controller.remove(id)).toBe(null);
    });
  });

  describe('findAllCitysByStateName', () => {
    it('should return a list of cities by state name', async () => {
      const stateName = 'ExampleState';
      const cities = []; 

      jest.spyOn(service, 'findAllCitiesByStateName').mockImplementation(() => cities[Symbol.toStringTag]);

      expect(await controller.findAllCitysByStateName(stateName)).toBe(cities);
    });
  });

  describe('findAllStates', () => {
    it('should return a list of states', async () => {
      const states = []; 

      jest.spyOn(service, 'findAllStates').mockImplementation(() => states[Symbol.toStringTag]);

      expect(await controller.findAllStates()).toBe(states);
    });
  });

  describe('findOne', () => {
    it('should return a specific location by ID', async () => {
      const id = 1; 
      const location = {}; 

      jest.spyOn(service, 'findOne').mockImplementation(() => location[Symbol.toStringTag]);

      expect(await controller.findOne(id)).toBe(location);
    });
  });

});
