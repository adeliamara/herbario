import { Test, TestingModule } from '@nestjs/testing';
import { EnvironmentsController } from './environments.controller';
import { EnvironmentsService } from './environments.service';
import { UpdateResult} from 'typeorm';
import { Environment } from './entities/environment.entity';
import { getRepositoryToken } from '@nestjs/typeorm';  // Importe getRepositoryToken
import { Repository } from 'typeorm';

describe('EnvironmentsController', () => {
  let controller: EnvironmentsController;
  let service: EnvironmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnvironmentsController],
      providers: [EnvironmentsService, 
        {
          provide: getRepositoryToken(Environment),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<EnvironmentsController>(EnvironmentsController);
    service = module.get<EnvironmentsService>(EnvironmentsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an environment', async () => {
    const createdEnvironmentDto = { name: 'adelia' };
    const createdEnvironment: Environment = {id: 1, name: 'adelia', createdAt: new Date(), updatedAt: new Date(), exsiccatas: [] };
    jest.spyOn(service, 'create').mockImplementation(() => Promise.resolve(createdEnvironment));

    expect(await controller.create(createdEnvironmentDto)).toBe(createdEnvironment);
  });

  it('should find all environments', async () => {
    const environments = [];
    jest.spyOn(service, 'findAll').mockImplementation(() =>  Promise.resolve(environments as Environment[]));

    expect(await controller.findAll()).toBe(environments);
  });

  it('should find one environment by ID', async () => {
    const id = 1;
    const environment = {};
    jest.spyOn(service, 'findOne').mockImplementation(() => Promise.resolve(environment as Environment));

    expect(await controller.findOne(id)).toBe(environment);
  });

  it('should update an environment by ID', async () => {
    const id = 1;
    const updateEnvironmentDto = {};
    const updateResult: UpdateResult = { affected: 1, raw: {}, generatedMaps: [] };
    jest.spyOn(service, 'update').mockImplementation(() => Promise.resolve(updateResult));
  
    await controller.update(id, updateEnvironmentDto);
  
    expect(service.update).toHaveBeenCalledWith(id, updateEnvironmentDto);
  });

  it('should remove an environment by ID', async () => {
    const id = 1;
    const deletedEverinments: Environment = {id: 1, name: 'flor', createdAt: new Date(), updatedAt: new Date(), exsiccatas: []}; 
    jest.spyOn(service, 'remove').mockImplementation(() => Promise.resolve(deletedEverinments));

    expect(await controller.remove(id)).toBe(deletedEverinments);
  });
});
