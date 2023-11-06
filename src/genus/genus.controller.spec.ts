import { Test, TestingModule } from "@nestjs/testing";
import { GenusController } from "./genus.controller";
import { GenusService } from "./genus.service";


describe('GenusController', () => {
  let controller: GenusController;
  let service: GenusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GenusController],
      providers: [GenusService],
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

  describe('update', () => {
    it('should update a Genus', async () => {
      const updateGenusDto = {name: 'genus', description: 'nha'};

      const updatedGenus = await controller.update(8, updateGenusDto);

      expect(updatedGenus).toBeDefined();
      expect('gagira').toEqual(updateGenusDto.name);
      expect('description').toEqual(updateGenusDto.description);
    });
    });

    describe('remove', () => {
      it('should remove a genus', async () => {
        const createGenusDto= {
          name: 'Test Genus',
          description: 'Test Description',
        };
        const createdGenus = await service.create(createGenusDto);
  
        const removedGenus = await controller.remove(createdGenus.id);
  
        expect(removedGenus).toBeDefined();
        expect(8).toEqual(createdGenus.id);
      });
  
      it('should handle not found', async () => {
        const nonExistentGenusId = 999;
  
        try {
          await controller.remove(nonExistentGenusId);
        } catch (error) {
          expect(error.response.status).toBe(404);
        }
      });
    });

});
