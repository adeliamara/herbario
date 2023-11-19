import { Test, TestingModule } from "@nestjs/testing";
import { GenusController } from "./genus.controller";
import { GenusService } from "./genus.service";
import { DeleteResult } from "typeorm";
import { Genus } from "./entities/genus.entity";
import { Repository, UpdateResult } from "typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";

describe('GenusController', () => {
  let controller: GenusController;
  let service: GenusService;

   beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GenusController],
      providers: [GenusService,
        {
          provide: getRepositoryToken(Genus),
          useClass: Repository,
        },
      ], 
    }).compile();

    controller = module.get<GenusController>(GenusController);
    service = module.get<GenusService>(GenusService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new Genus', async () => {
      const createGenusDto = {name: 'flor', description: 'example', createdAt: new Date(), updatedAt: new Date()};
      const createdGenus = {id: 2, name: 'gira', description: 'example', createdAt: new Date(), updatedAt: new Date()};

      jest.spyOn(service, 'create').mockResolvedValue(createdGenus);

      const result = await controller.create(createGenusDto);
      expect(result).toBe(createdGenus);
    });
  });

  describe('findAll', () => {
    it('should return an array of Genus', async () => {
      const expectedGenusList = [{ id: 2, name: 'll', createdAt: new Date(), updatedAt: new Date()}];

      jest.spyOn(service, 'findAll').mockResolvedValue(expectedGenusList);

      const result = await controller.findAll();
      expect(result).toBe(expectedGenusList);
    });
  });

  describe('findOne', () => {
    it('should return a single Genus', async () => {
      const id = 1;
      const expectedGenus = { id: 2, name: 'gagira', createdAt: new Date(), updatedAt: new Date()};

      jest.spyOn(service, 'findOne').mockResolvedValue(expectedGenus);

      const result = await controller.findOne(id);
      expect(result).toBe(expectedGenus);
    });
  });

    it('should update a Genus', async () => {
    const id = 1;
    const updateGenusDto = {};
    const updateResult: UpdateResult = { affected: 1, raw: {}, generatedMaps: [] };
    jest.spyOn(service, 'update').mockImplementation(() => Promise.resolve(updateResult));
  
    await controller.update(id, updateGenusDto);
  
    expect(service.update).toHaveBeenCalledWith(id, updateGenusDto);
    });

    it('should remove a genus', async () => {
      const id = 1;
      const deleteResult: DeleteResult = { affected: 1, raw: {}};
    
      jest.spyOn(service, 'remove').mockResolvedValue(deleteResult);
    
      const result = await controller.remove(id);
      expect(result).toEqual(deleteResult);
    });
    
    it('should handle not found', async () => {
      const nonExistentGenusId = 999;
    
      // Modificando a implementação para retornar uma Promise rejeitada
      jest.spyOn(service, 'remove').mockRejectedValue({ response: { status: 404 } });
    
      try {
        await controller.remove(nonExistentGenusId);
      } catch (error) {
        expect(error.response.status).toBe(404);
      }
    });
});
