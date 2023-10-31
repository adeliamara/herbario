import { Test, TestingModule } from '@nestjs/testing';
import { GenusService } from './genus.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genus } from './entities/genus.entity';

describe('GenusService', () => {
  let genusService: GenusService;
  let genusRepository: Repository<Genus>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GenusService,
        {
          provide: getRepositoryToken(Genus),
          useClass: Repository,
        },
      ],
    }).compile();

    genusService = module.get<GenusService>(GenusService);
    genusRepository = module.get<Repository<Genus>>(getRepositoryToken(Genus));
  });

  it('should be defined', () => {
    expect(genusService).toBeDefined();
  });

  it('should create a genus', async () => {
    const createGenusDto = { name: 'Test Genus' };
    const savedGenus = new Genus();
    savedGenus.name = 'Test Genus';

    jest.spyOn(genusRepository, 'save').mockResolvedValue(savedGenus);

    const result = await genusService.create(createGenusDto);
    expect(result).toEqual(savedGenus);
  });

  it('should find all genuses', async () => {
    const genuses = [new Genus(), new Genus()];

    jest.spyOn(genusRepository, 'find').mockResolvedValue(genuses);

    const result = await genusService.findAll();
    expect(result).toEqual(genuses);
  });

  it('should find a genus by ID', async () => {
    const genusId = 1;
    const genus = new Genus();
    genus.id = genusId;

    jest.spyOn(genusRepository, 'findOne').mockResolvedValue(genus);

    const result = await genusService.findOne(genusId);
    expect(result).toEqual(genus);
  });

  it('should update a genus', async () => {
    const genusId = 1;
    const updateGenusDto = { name: 'Updated Genus' };
    const updatedGenus = new Genus();
    updatedGenus.id = genusId;
    updatedGenus.name = 'Updated Genus';

    jest.spyOn(genusRepository, 'update').mockResolvedValue({ affected: 1 });
    jest.spyOn(genusRepository, 'findOne').mockResolvedValue(updatedGenus);

    const result = await genusService.update(genusId, updateGenusDto);
    expect(result).toEqual(updatedGenus);
  });

  it('should remove a genus by ID', async () => {
    const genusId = 1;

    jest.spyOn(genusRepository, 'delete').mockResolvedValue({ affected: 1 });

    const result = await genusService.remove(genusId);
    expect(result).toBeUndefined();
  });
});
