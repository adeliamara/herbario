import { Test, TestingModule } from '@nestjs/testing';
import { LocationsController } from './locations.controller';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

describe('LocationsController', () => {
  let locationsController: LocationsController;
  let locationsService: LocationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationsController],
      providers: [LocationsService],
    }).compile();

    locationsController = module.get<LocationsController>(LocationsController);
    locationsService = module.get<LocationsService>(LocationsService);
  });

  it('should be defined', () => {
    expect(locationsController).toBeDefined();
  });

  it('should create a location', async () => {
    const CreateLocationDto: CreateLocationDto = { city: 'teresina', state: 'pi' };

    jest.spyOn(locationsService, 'create').mockResolvedValue(CreateLocationDto); 

    const result = await locationsController.create(CreateLocationDto);
    expect(result).toBe(CreateLocationDto);
  });

  it('should find all locations', async () => {
    const locations = [];

    jest.spyOn(locationsService, 'findAll').mockResolvedValue(locations); 

    const result = await locationsController.findAll();
    expect(result).toEqual(locations);
  });

  it('should update a location'), async () => {
    const locationId = 1;
    const updateLocationDto: UpdateLocationDto = {}};
  
    jest.spyOn(locationsService, 'update').mockResolvedValue(updateLocationDto);
  
    const result = await locationsController.update(locationId, UpdateLocationDto);
    expect(result).toBe(UpdateLocationDto);
  });
  
  it('should remove a location', async () => {
    const locationId = 1;
  
    jest.spyOn(LocationsService, 'remove').mockResolvedValue(undefined);
  
    const result = await LocationsController.remove(locationId);
    expect(result).toBeUndefined();
  });
  
  it('should find all cities by state name', async () => {
    const stateName = 'ExampleState';
    const cities = [/* provide example city data here */];
  
    jest.spyOn(LocationsService, 'findAllCitiesByStateName').mockResolvedValue(cities);
  
    const result = await LocationsController.findAllCitysByStateName(stateName);
    expect(result).toEqual(cities);
  });
  
  it('should find all states', async () => {
    const states = [/* provide example state data here */];
  
    jest.spyOn(LocationsService, 'findAllStates').mockResolvedValue(states);
  
    const result = await locationsController.findAllStates();
    expect(result).toEqual(states);
  });
  
  it('should find a location by ID', async () => {
    const locationId = 1;
    const location = { /* provide example location data here */ };
  
    jest.spyOn(LocationsService, 'findOne').mockResolvedValue(location);
  
    const result = await LocationsController.findOne(locationId);
    expect(result).toEqual(location);
  });
