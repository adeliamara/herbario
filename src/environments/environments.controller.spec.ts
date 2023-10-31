import { Test, TestingModule } from '@nestjs/testing';
import { EnvironmentsController } from './environments.controller';
import { EnvironmentsService } from './environments.service';
import { CreateEnvironmentDto } from './dto/create-environment.dto';
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
    const createEnvironmentDto: CreateEnvironmentDto = {name: 'adelia'};
    const createdEnvironment = {}; // Replace with the expected created environment object
    jest.spyOn(service, 'create').mockImplementation(() => createdEnvironment);

    expect(await controller.create(createEnvironmentDto)).toBe(createdEnvironment);
  });

  it('should find all environments', async () => {
    const environments = [];
    jest.spyOn(service, 'findAll').mockImplementation(() => environments);

    expect(await controller.findAll()).toBe(environments);
  });

  it('should find one environment by ID', async () => {
    const id = 1;
    const environment = {}; 
    jest.spyOn(service, 'findOne').mockImplementation(() => environment);

    expect(await controller.findOne(id)).toBe(environment);
  });

  it('should update an environment by ID', async () => {
    const id = 1; 
    const updateEnvironmentDto: UpdateEnvironmentDto = {};
    const updatedEnvironment = {};
    jest.spyOn(service, 'update').mockImplementation(() => updatedEnvironment);

    expect(await controller.update(id, updateEnvironmentDto)).toBe(updatedEnvironment);
  });

  it('should remove an environment by ID', async () => {
    const id = 1; 
    const deletedEnvironment = {}; 
    jest.spyOn(service, 'remove').mockImplementation(() => deletedEnvironment);

    expect(await controller.remove(id)).toBe(deletedEnvironment);
  });
});
