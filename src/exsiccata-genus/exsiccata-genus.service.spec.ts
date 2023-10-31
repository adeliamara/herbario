import { Test, TestingModule } from '@nestjs/testing';
import { ExsiccataGenusService } from './exsiccata-genus.service';
import { CreateExsiccataGenusDto } from './dto/create-exsiccata-genus.dto';
import { UpdateExsiccataGenusDto } from './dto/update-exsiccata-genus.dto';

describe('ExsiccataGenusService', () => {
  let exsiccataGenusService: ExsiccataGenusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExsiccataGenusService],
    }).compile();

    exsiccataGenusService = module.get<ExsiccataGenusService>(ExsiccataGenusService);
  });

  it('should be defined', () => {
    expect(exsiccataGenusService).toBeDefined();
  });

  describe('create', () => {
    it('should create an Exsiccata Genus', () => {
      const createExsiccataGenusDto: CreateExsiccataGenusDto = { /* your test data */ };
      const result = exsiccataGenusService.create(createExsiccataGenusDto);
      expect(result).toBe('This action adds a new exsiccataGenu');
    });
  });

  describe('findAll', () => {
    it('should return all Exsiccata Genus', () => {
      const result = exsiccataGenusService.findAll();
      expect(result).toBe('This action returns all exsiccataGenus');
    });
  });

  describe('findOne', () => {
    it('should return a specific Exsiccata Genus by ID', () => {
      const id = 1; // Replace with a valid ID
      const result = exsiccataGenusService.findOne(id);
      expect(result).toBe(`This action returns a #${id} exsiccataGenu`);
    });
  });

  describe('update', () => {
    it('should update a specific Exsiccata Genus by ID', () => {
      const id = 1; // Replace with a valid ID
      const updateExsiccataGenusDto: UpdateExsiccataGenusDto = { /* your update DTO data */ };
      const result = exsiccataGenusService.update(id, updateExsiccataGenusDto);
      expect(result).toBe(`This action updates a #${id} exsiccataGenu`);
    });
  });

  describe('remove', () => {
    it('should remove a specific Exsiccata Genus by ID', () => {
      const id = 1; // Replace with a valid ID
      const result = exsiccataGenusService.remove(id);
      expect(result).toBe(`This action removes a #${id} exsiccataGenu`);
    });
  });
});
