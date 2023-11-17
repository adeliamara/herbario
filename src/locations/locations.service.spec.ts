import { Test, TestingModule } from '@nestjs/testing';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

describe('LocationsService', () => {
  let locationsService: LocationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocationsService],
    }).compile();

    locationsService = module.get<LocationsService>(LocationsService);
  });

  it('should create a new location', async () => {
    const createLocationDto: CreateLocationDto = {
      city: 'New City',
      state: 'New State',
    };
    const createdLocation = await locationsService.create(createLocationDto);

    expect(createdLocation).toHaveProperty('id');
  });
  it('should return findAll locations', async () => {
    const allLocations = await locationsService.findAll();
  
    expect(allLocations).toHaveLength(1);
  });

  it('should findOne a location by ID', async () => {
    const locationId = 1;
    const foundLocation = await locationsService.findOne(locationId);
  
    expect(foundLocation).toBeDefined();
  });

  it('should update a location', async () => {
    const locationId = 1;
    const updateLocationDto: UpdateLocationDto = {
      city: 'Updated City',
      state: 'Updated State',
    };
    const updatedLocation = await locationsService.update(locationId, updateLocationDto);
  
    expect(updatedLocation).toBeDefined();
  });

  it('should remove a location', async () => {
    const locationId = 1;
    const removedLocation = await locationsService.remove(locationId);
  
    expect(removedLocation).toBeDefined();
  });

  it('should return a list of distinct states', async () => {
    const states = await locationsService.findAllStates();

    expect(states).toBeDefined();
    expect(states).toBeInstanceOf(Array);
  });

  it('should return a list of cities for a specific state', async () => {
    const stateName = 'YourStateName';
    const cities = await locationsService.findAllCitiesByStateName(stateName);

    expect(cities).toBeDefined();
    expect(cities).toBeInstanceOf(Array);
  });
});
