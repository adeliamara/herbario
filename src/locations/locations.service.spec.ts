import { Test, TestingModule } from '@nestjs/testing';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';

describe('LocationsService', () => {
  let locationsService: LocationsService;
  let locationsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocationsService,
        {
          provide: getRepositoryToken(Location),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            createQueryBuilder: jest.fn(() => ({
              select: jest.fn().mockReturnThis(),
              distinct: jest.fn().mockReturnThis(),
              from: jest.fn().mockReturnThis(),
              getRawMany: jest.fn().mockResolvedValue([]),
            })),
          },
        },
      ],
    }).compile();

    locationsService = module.get<LocationsService>(LocationsService);
    locationsRepository = module.get(getRepositoryToken(Location));
  });

  it('should create a new location', async () => {
    const createLocationDto: CreateLocationDto = {city: 'the', state: 'pi'};
    const mockLocation = {};
    locationsRepository.save.mockResolvedValue(mockLocation);

    const result = await locationsService.create(createLocationDto);

    expect(locationsRepository.save).toHaveBeenCalledWith(createLocationDto);
    expect(result).toEqual(mockLocation);
  });

  it('should findAll locations', async () => {
    const mockLocationArray = [new Location()];
    locationsRepository.find.mockResolvedValue(mockLocationArray);

    const result = await locationsService.findAll();

    expect(result).toEqual(mockLocationArray);
  });

  it('should findOne a location by ID', async () => {
      const id = 1;
      const mockLocation = {};
      locationsRepository.findOne.mockResolvedValue(mockLocation);

      const result = await locationsService.findOne(id);

      expect(result).toEqual(mockLocation);
  });

  it('should update a location', async () => {
    const locationId = 1;
    const updateLocationDto: UpdateLocationDto = {city: 'Updated City',state: 'Updated State'};
    locationsRepository.update.mockResolvedValue({affected: 1});
  
    const result = await locationsService.update(locationId, updateLocationDto);

    expect(locationsRepository.update).toHaveBeenCalledWith(locationId, updateLocationDto);
  });

  it('should remove a location', async () => {
    const locationId = 1;
    locationsRepository.delete.mockResolvedValue({ affected: 1 });

      const result = await locationsService.remove(locationId);

      expect(locationsRepository.delete).toHaveBeenCalledWith(locationId);
  });

  it('should return a list of distinct states', async () => {
    const states = await locationsService.findAllStates();

    expect(states).toBeDefined();
    expect(states).toBeInstanceOf(Array);
  });

  it('should return a list of cities for a specific state', async () => {
    locationsRepository.createQueryBuilder.mockReturnValue({
      select: jest.fn().mockReturnThis(),
      from: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      getRawMany: jest.fn().mockResolvedValue([]), 
    });

    const stateName = 'YourStateName';
    const cities = await locationsService.findAllCitiesByStateName(stateName);

    expect(cities).toBeDefined();
    expect(cities).toBeInstanceOf(Array);
  });
});