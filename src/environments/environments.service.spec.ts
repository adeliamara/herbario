import { Test, TestingModule } from '@nestjs/testing';
import { EnvironmentsService } from './environments.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Environment } from './entities/environment.entity';

describe('EnvironmentsService', () => {
  let service: EnvironmentsService;

  const mockEnvironmentRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneOrFail: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EnvironmentsService,
        {
          provide: getRepositoryToken(Environment),
          useValue: mockEnvironmentRepository,
        },
      ],
    }).compile();

    service = module.get<EnvironmentsService>(EnvironmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new environment', async () => {
      const createEnvironmentDto = { name: 'Test Environment' };
      const mockEnvironment = new Environment();
      mockEnvironment.name = 'Test Environment';
      mockEnvironmentRepository.create.mockReturnValue(mockEnvironment);

      const result = await service.create(createEnvironmentDto);

      expect(result).toEqual(mockEnvironment);
    });
  });

  describe('findAll', () => {
    it('should return a list of environments', async () => {
      const mockEnvironments = [new Environment(), new Environment()];
      mockEnvironmentRepository.find.mockReturnValue(mockEnvironments);

      const result = await service.findAll();

      expect(result).toEqual(mockEnvironments);
    });
  });

  describe('update', () => {
    it('should update an environment', async () => {
      const id = 1; 
      const updateEnvironmentDto = { name: 'Updated Environment' };
      const mockEnvironment = new Environment();
      mockEnvironment.id = id;
      mockEnvironmentRepository.findOneOrFail.mockReturnValue(mockEnvironment);

      const result = await service.update(id, updateEnvironmentDto);

      expect(result).toEqual(mockEnvironment);
    });
  });

  describe('remove', () => {
    it('should remove an environment', async () => {
      const id = 1; 
      const mockEnvironment = new Environment();
      mockEnvironment.id = id;
      mockEnvironmentRepository.findOneOrFail.mockReturnValue(mockEnvironment);

      const result = await service.remove(id);

      expect(result).toEqual(mockEnvironment);
    });
  });
});
