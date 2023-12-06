import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateExsiccataDto } from './dto/create-exsiccata.dto';
import { UpdateExsiccataDto } from './dto/update-exsiccata.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Entity, IsNull, Not, Repository, SelectQueryBuilder } from 'typeorm';
import { Exsiccata } from './entities/exsiccata.entity';
import { Family } from 'src/families/entities/family.entity';
import { FamiliesService } from 'src/families/families.service';
import { Species } from 'src/species/entities/species.entity';
import { Genus } from 'src/genus/entities/genus.entity';
import { GenusService } from 'src/genus/genus.service';
import { LocationsService } from 'src/locations/locations.service';
import { Location } from 'src/locations/entities/location.entity';
import { SpeciesService } from 'src/species/species.service';
import { Environment } from 'src/environments/entities/environment.entity';
import { EnvironmentsService } from 'src/environments/environments.service';
import { BotanistsService } from 'src/botanists/botanists.service';
import { Botanist } from 'src/botanists/entities/botanist.entity';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';
import { ExsiccataFamily } from '../exsiccata-family/entities/exsiccata-family.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ExsiccataService {
  constructor(
    @InjectRepository(Exsiccata)
    private exsiccataRepository: Repository<Exsiccata>,

    private familyService: FamiliesService,
    private speciesService: SpeciesService,
    private genusService: GenusService,
    private botanistsService: BotanistsService,
    private locationService: LocationsService,
    private environmentService: EnvironmentsService
  ) { }

  async create(userReq: User, createExsiccataDto: CreateExsiccataDto) {
    const { familyId, speciesId, collectorId, genusId, environmentId, determinatorId, locationId, ...exsiccataData } = createExsiccataDto;
    const collection_number: number = (await this.findAllByCollectorId(collectorId)).length;
    createExsiccataDto.collectionNumberPerCollector = collection_number + 1;

    const collectionNumber: number = (await this.findAllByCollectorId(collectorId)).length;
    createExsiccataDto.collectionNumberPerCollector = collectionNumber + 1;

    const family: Family = await this.getEntity(this.familyService, familyId, 'Família não encontrada');
    const species: Species = await this.getEntity(this.speciesService, speciesId, 'Espécie não encontrada');
    const genus: Genus = await this.getEntity(this.genusService, genusId, 'Gênero não encontrado');
    const collector: Botanist = await this.getEntity(this.botanistsService, collectorId, 'Coletor não encontrado');
    const determinator: Botanist = await this.getEntity(this.botanistsService, determinatorId, 'Determinador não encontrado');
    const location: Location = await this.getEntity(this.locationService, locationId, 'Localização não encontrada');
    const environment: Environment = await this.getEntity(this.environmentService, environmentId, 'Ambiente não encontrado');

    const exsiccata: Exsiccata = this.exsiccataRepository.create(createExsiccataDto);

    createExsiccataDto.scientificName = `${family.name} ${species.name}`;

    exsiccata.families = [family];
    exsiccata.species = [species];
    exsiccata.genus = [genus];
    exsiccata.collector = collector;
    exsiccata.determinator = determinator;
    exsiccata.location = location;
    exsiccata.environment = environment;
    exsiccata.user = userReq;

    return this.exsiccataRepository.save(exsiccata);
  }

  async findAll(): Promise<Exsiccata[]> {
    const exsiccatas = await this.exsiccataRepository
      .createQueryBuilder('exsiccata')
      .leftJoinAndSelect('exsiccata.families', 'family')
      .leftJoinAndSelect('exsiccata.species', 'species')
      .leftJoinAndSelect('exsiccata.genus', 'genus')
      .leftJoin('exsiccata.collector', 'collector')
      .addSelect(['collector.name'])
      .leftJoin('exsiccata.determinator', 'determinator')
      .addSelect(['determinator.name'])
      .leftJoinAndSelect('exsiccata.location', 'location_table')
      .getMany();

    return exsiccatas || [];
  }

  async findByIds(ids: number[]): Promise<Exsiccata[]> {
    const exsiccatas = await this.exsiccataRepository
      .createQueryBuilder('exsiccata')
      .leftJoinAndSelect('exsiccata.families', 'family')
      .leftJoinAndSelect('exsiccata.species', 'species')
      .leftJoinAndSelect('exsiccata.genus', 'genus')
      .leftJoin('exsiccata.collector', 'collector')
      .addSelect(['collector.name'])
      .leftJoin('exsiccata.determinator', 'determinator')
      .addSelect(['determinator.name'])
      .leftJoinAndSelect('exsiccata.location', 'location_table')
      .whereInIds(ids)  // Usamos o método whereInIds para filtrar por IDs
      .getMany();

    return exsiccatas || [];
  }

  async findAllPaginateWithFilter(filterParams: {
    scientificName?: string;
    collectionDateStart?: Date;
    collectionDateEnd?: Date;
    commonName?: string;
    growthHabit?: string;
    color?: string;
    familyName?: string;
    speciesName?: string;
    genusName?: string;
    collectorName?: string;
    determinatorName?: string;
    environmentName?: string;
  }, options: IPaginationOptions): Promise<Pagination<Exsiccata>> {

    const { scientificName, collectionDateStart, collectionDateEnd, commonName, growthHabit, color, familyName, speciesName, genusName, determinatorName, collectorName, environmentName } = filterParams;
    const queryBuilder = this.exsiccataRepository.createQueryBuilder('exsiccata');

    queryBuilder.leftJoinAndSelect('exsiccata.families', 'family')
      .leftJoinAndSelect('exsiccata.species', 'species')
      .leftJoinAndSelect('exsiccata.genus', 'genus')
      .leftJoin('exsiccata.collector', 'collector')
      .addSelect(['collector.name'])
      .leftJoin('exsiccata.determinator', 'determinator')
      .addSelect(['determinator.name'])
      .leftJoinAndSelect('exsiccata.location', 'location_table')

    if (scientificName) {
      queryBuilder.andWhere('exsiccata.scientificName ILIKE :scientificName', {
        scientificName: `%${scientificName}%`,
      });
    }

    if (collectionDateStart && collectionDateEnd) {
      queryBuilder.andWhere('exsiccata.collectionDate BETWEEN :startDate AND :endDate', {
        startDate: collectionDateStart,
        endDate: collectionDateEnd,
      });
    }

    if (commonName) {
      queryBuilder.andWhere('exsiccata.commonName ILIKE :commonName', {
        commonName: `%${commonName}%`,
      });
    }

    if (growthHabit) {
      queryBuilder.andWhere('exsiccata.growthHabit ILIKE :growthHabit', {
        growthHabit: `%${growthHabit}%`,
      });
    }

    if (color) {
      queryBuilder.andWhere('exsiccata.color ILIKE :color', {
        color: `%${color}%`,
      });
    }

    if (familyName) {
      queryBuilder.andWhere('family.name ILIKE :familyName', { familyName: `%${familyName}%` });
    }

    if (speciesName) {
      queryBuilder.andWhere('species.name ILIKE :speciesName', { speciesName: `%${speciesName}%` });
    }

    if (genusName) {
      queryBuilder.andWhere('genus.name ILIKE :genusName', { genusName: `%${genusName}%` });
    }

    if (collectorName) {
      queryBuilder.andWhere('collector.name ILIKE :collectorName', { collectorName: `%${collectorName}%` });
    }

    if (determinatorName) {
      queryBuilder.andWhere('determinator.name ILIKE :determinatorName', { determinatorName: `%${determinatorName}%` });
    }

    if (environmentName) {
      queryBuilder.andWhere('environment.name ILIKE :environmentName', { environmentName: `%${environmentName}%` });
    }

    // queryBuilder.where('exsiccata.removed = :removed', { removed: false });
    const paginatedResults = await this.paginate(queryBuilder, options);

    return paginatedResults;
  }

  async findOne(id: number) {
    const exsiccata = await this.exsiccataRepository
      .createQueryBuilder('exsiccata')
      .leftJoinAndSelect('exsiccata.families', 'family')
      .leftJoinAndSelect('exsiccata.species', 'species')
      .leftJoinAndSelect('exsiccata.genus', 'genus')
      .leftJoin('exsiccata.collector', 'collector')
      .addSelect(['collector.name'])
      .leftJoin('exsiccata.determinator', 'determinator')
      .addSelect(['determinator.name'])
      .leftJoinAndSelect('exsiccata.location', 'location_table')
      .where('exsiccata.id = :id', { id })
      .getOne();

    if (!exsiccata) {
      throw new NotFoundException(`Exsicata com ID ${id} não encontrada`);
    }

    if (!exsiccata) {
      throw new NotFoundException(`Exsicata com ID ${id} não encontrada`);
    }

    return exsiccata;
  }

  addNewGenusSpecieOrFamily(id: number, updateExsiccataDto: UpdateExsiccataDto) {
    return this.exsiccataRepository.update(id, updateExsiccataDto);
  }

  async update(id: number, updateExsiccataDto: UpdateExsiccataDto) {
    const { familyId, speciesId, genusId, collectorId, determinatorId, ...updateExsiccataData } = updateExsiccataDto;

    let exsiccata = await this.findOne(id);
    if (!exsiccata) {
      throw new NotFoundException('Exsiccata não encontrado');
    }

    const collector = await this.getEntity(this.botanistsService, collectorId, 'Coletor não encontrado');
    const determinator = await this.getEntity(this.botanistsService, determinatorId, 'Determinador não encontrado');

    const [family, genus, species] = await Promise.all([
      this.getEntity(this.familyService, familyId, 'Família não encontrada'),
      this.getEntity(this.genusService, genusId, 'Gênero não encontrado'),
      this.getEntity(this.speciesService, speciesId, 'Espécie não encontrada'),
    ]);

    const updatedFamilyName = family?.name || (exsiccata.families.slice(-1)[0]?.name) || '';
    const updatedSpecieName = species?.name || (exsiccata.species.slice(-1)[0]?.name) || '';
    exsiccata.scientificName = `${updatedFamilyName} ${updatedSpecieName}`;

    Object.assign(exsiccata, {
      collector: collector || exsiccata.collector,
      determinator: determinator || exsiccata.determinator,
      ...updateExsiccataData,
    });

    if (family) {
      exsiccata.families.push(family);
    }

    if (genus) {
      exsiccata.genus.push(genus);
    }

    if (species) {
      exsiccata.species.push(species);
    }

    return this.exsiccataRepository.save(exsiccata);
  }

  async remove(id: number) {
    const exsiccata: Exsiccata = await this.findOne(id)
    return this.exsiccataRepository.softRemove(exsiccata);
  }

  async findAllByCollectorId(collectorId: number) {
    return await this.exsiccataRepository.find({
      where: { collector: { id: collectorId } },
    });
  }

  async paginate(queryBuilder: SelectQueryBuilder<Exsiccata>, options: IPaginationOptions): Promise<Pagination<Exsiccata>> {
    return await paginate(queryBuilder, options);
  }

  private async getEntity(service: any, id: number | undefined, notFoundMessage: string) {
    if (id == undefined) {
      return undefined;
    }

    const entity = await service.findOne(id)

    if (!entity) {
      throw new NotFoundException(notFoundMessage);
    }

    return entity;
  }

  async count() {
    return await this.exsiccataRepository.count();
  }

  async getSoftDeleted() {
    const softDeletedExsiccata = await this.exsiccataRepository.find({
      where: {
        deletedAt: Not(IsNull()),
      },
      withDeleted: true,
    });

    return softDeletedExsiccata;
  }

  async findStatesWithMostExsicatas(): Promise<{ state: string, exsicatasCount: number }[]> {
    const statesWithExsicatas = await this.exsiccataRepository
      .createQueryBuilder('exsiccata')
      .innerJoin('exsiccata.location', 'location')
      .select(['location.state', 'COUNT(exsiccata.id) as exsicatasCount'])
      .groupBy('location.state')
      .orderBy('exsicatasCount', 'DESC')
      .getRawMany();

    return statesWithExsicatas;
  }

  async countExsiccataPerTimeUnit(
    queryType: 'created' | 'deleted',
    groupBy: 'month' | 'year' | 'day',
    unitsAgo: number
  ): Promise<{ timeUnit: string; count: number }[]> {
    const now = new Date();
    const startDate = new Date(now);

    let formatString = '';

    switch (groupBy) {
      case 'month':
        startDate.setMonth(now.getMonth() - unitsAgo);
        formatString = 'MM/YYYY';
        break;
      case 'year':
        startDate.setFullYear(now.getFullYear() - unitsAgo);
        formatString = 'YYYY';
        break;
      case 'day':
        startDate.setDate(now.getDate() - unitsAgo);
        formatString = 'DD/MM/YYYY';
        break;
      default:
        throw new BadRequestException('Unidade de tempo inválida. Escolha entre "month", "year" ou "day".');
    }

    const whereClause = queryType === 'created' ? { createdAt: Between(startDate, now) } : { deletedAt: Between(startDate, now) };

    const exsiccataQueryBuilder = this.exsiccataRepository
      .createQueryBuilder('exsiccata')
      .select([
        `TO_CHAR(exsiccata.createdAt, '${formatString}') AS timeUnit`,
        'COUNT(exsiccata.id) AS count',
      ])
      .where(whereClause)
      .groupBy('timeUnit')
      .orderBy('timeUnit', 'ASC');

    if (queryType === 'deleted') {
      (exsiccataQueryBuilder as SelectQueryBuilder<any>).withDeleted();
    }

    const exsicatasPerTimeUnit = await exsiccataQueryBuilder.getRawMany();

    return exsicatasPerTimeUnit;
  
  }

  async countExsiccataCreatedPerTimeUnit(groupBy: 'month' | 'year' | 'day', unitsAgo: number): Promise<{ timeUnit: string; count: number }[]> {
    return this.countExsiccataPerTimeUnit('created', groupBy, unitsAgo);
  }

  async countExsiccataDeletedPerTimeUnit(groupBy: 'month' | 'year' | 'day', unitsAgo: number): Promise<{ timeUnit: string; count: number }[]> {
    return this.countExsiccataPerTimeUnit('deleted', groupBy, unitsAgo);
  }

  async countExsiccataWaitingForDetermination(): Promise<number> {
    const count = await this.exsiccataRepository
      .createQueryBuilder('exsiccata')
      .where({ determinationDate: IsNull() })
      .getCount();

    return count;
  }
}
