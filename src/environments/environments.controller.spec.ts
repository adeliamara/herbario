import { Test, TestingModule } from '@nestjs/testing';
import { EnvironmentsController } from './environments.controller';
import { EnvironmentsService } from './environments.service';
import { UpdateEnvironmentDto } from './dto/update-environment.dto';

describe('EnvironmentsController', () => {
  let controller: EnvironmentsController;
  let service: EnvironmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnvironmentsController],
      providers: [EnvironmentsService],
    }).compile();

    controller = module.get<EnvironmentsController>(EnvironmentsController);
    service = module.get<EnvironmentsService>(EnvironmentsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an environment', async () => {
    const createdEnvironmentDto = {name: 'adelia'};
    const createdEnvironment = {}; 
    jest.spyOn(service, 'create').mockImplementation(() => createdEnvironmentDto[Symbol.toStringTag]);

    expect(await controller.create(createdEnvironmentDto)).toBe(createdEnvironment);
  });

  it('should find all environments', async () => {
    const environments = [];
    jest.spyOn(service, 'findAll').mockImplementation(() => environments[Symbol.toStringTag]);

    expect(await controller.findAll()).toBe(environments);
  });

  it('should find one environment by ID', async () => {
    const id = 1;
    const environment = {}; 
    jest.spyOn(service, 'findOne').mockImplementation(() => environment[Symbol.toStringTag]);

    expect(await controller.findOne(id)).toBe(environment);
  });

  it('should update an environment by ID', async () => {
    const id = 1; 
    const updateEnvironmentDto = {};
    const updatedEnvironment = {};
    jest.spyOn(service, 'update').mockImplementation(() => updatedEnvironment[Symbol.toStringTag]);

    expect(await controller.update(id, updateEnvironmentDto)).toBe(updatedEnvironment);
  });

  it('should remove an environment by ID', async () => {
    const id = 1; 
    const deletedEnvironment = {}; 
    jest.spyOn(service, 'remove').mockImplementation(() => deletedEnvironment[Symbol.toStringTag]);

    expect(await controller.remove(id)).toBe(deletedEnvironment);
  });
});
