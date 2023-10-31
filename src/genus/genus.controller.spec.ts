import { Test, TestingModule } from '@nestjs/testing';
import { GenusController } from './genus.controller';
import { GenusService } from './genus.service';
import { CreateGenusDto } from './dto/create-genus.dto';
import { UpdateGenusDto } from './dto/update-genus.dto';

describe('GenusController', () => {
  let genusController: GenusController;
  let genusService: GenusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GenusController],
      providers: [GenusService],
    }).compile();

    genusController = module.get<GenusController>(GenusController);
    genusService = module.get<GenusService>(GenusService);
  });

  it('should be defined', () => {
    expect(genusController).toBeDefined();
  });

  describe('create', () => {
    it('should create a new genus', async () => {
      const createGenusDto: CreateGenusDto = {
        name: 'Test Genus',
      };
      const createdGenus = { id: 1, name: 'Test Genus' };
      jest.spyOn(genusService, 'create').mockResolvedValue(createdGenus);

      const result = await genusController.create(createGenusDto);

      expect(result).toBe(createdGenus);
    });
  });

  describe('findAll', () => {
    it('should return an array of genera', async () => {
      const genera = [{ id: 1, name: 'Genus 1' }, { id: 2, name: 'Genus 2' }];
      jest.spyOn(genusService, 'findAll').mockResolvedValue(genera);

      const result = await genusController.findAll();

      expect(result).toBe(genera);
    });
  });

  describe('findOne', () => {
    it('should return a specific genus by ID', async () => {
      const genusId = 1;
      const genus = { id: 1, name: 'Test Genus' };
      jest.spyOn(genusService, 'findOne').mockResolvedValue(genus);

      const result = await genusController.findOne(genusId);

      expect(result).toBe(genus);
    });
  });

  describe('update', () => {
    it('should update a genus by ID', async () => {
      const genusId = 1;
      const updateGenusDto: UpdateGenusDto = { name: 'Updated Genus' };
      const updatedGenus = { id: 1, name: 'Updated Genus' };
      jest.spyOn(genusService, 'update').mockResolvedValue(updatedGenus);

      const result = await genusController.update(genusId, updateGenusDto);

      expect(result).toBe(updatedGenus);
    });
  });

  describe('remove', () => {
    it('should remove a genus by ID', async () => {
      const genusId = 1;
      const removalResult = { success: true };
      jest.spyOn(genusService, 'remove').mockResolvedValue(removalResult);

      const result = await genusController.remove(genusId);

      expect(result).toBe(removalResult);
    });
  });
});
