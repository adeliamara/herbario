import { Test, TestingModule } from '@nestjs/testing';
import { ExsiccataSpeciesService } from './exsiccata-species.service';
import { CreateExsiccataSpeciesDto } from './dto/create-exsiccata-species.dto';
import { UpdateExsiccataSpeciesDto } from './dto/update-exsiccata-species.dto';

describe('ExsiccataSpeciesService', () => {
  let exsiccataSpeciesService: ExsiccataSpeciesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExsiccataSpeciesService],
    }).compile();

    exsiccataSpeciesService = module.get<ExsiccataSpeciesService>(ExsiccataSpeciesService);
  });

  it('should be defined', () => {
    expect(exsiccataSpeciesService).toBeDefined();
  });

  describe('create', () => {
    it('should create an Exsiccata Species', () => {
      const createExsiccataSpeciesDto: CreateExsiccataSpeciesDto = {};
      const result = exsiccataSpeciesService.create(createExsiccataSpeciesDto);
      expect(result).toBe('This action adds a new exsiccataSpecy');
    });
  });

  describe('findAll', () => {
    it('should return all Exsiccata Species', () => {
      const result = exsiccataSpeciesService.findAll();
      expect(result).toBe('This action returns all exsiccataSpecies');
    });
  });

  describe('findOne', () => {
    it('should return a specific Exsiccata Species by ID', () => {
      const id = 1;
      const result = exsiccataSpeciesService.findOne(id);
      expect(result).toBe(`This action returns a #${id} exsiccataSpecy`);
    });
  });

  describe('update', () => {
    it('should update a specific Exsiccata Species by ID', () => {
      const id = 1; 
      const updateExsiccataSpeciesDto: UpdateExsiccataSpeciesDto = {};
      const result = exsiccataSpeciesService.update(id, updateExsiccataSpeciesDto);
      expect(result).toBe(`This action updates a #${id} exsiccataSpecy`);
    });
  });

  describe('remove', () => {
    it('should remove a specific Exsiccata Species by ID', () => {
      const id = 1;
      const result = exsiccataSpeciesService.remove(id);
      expect(result).toBe(`This action removes a #${id} exsiccataSpecy`);
    });
  });
});
