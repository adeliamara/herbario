import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Exsiccata } from "./entities/exsiccata.entity";
import { Repository, SelectQueryBuilder } from "typeorm";
import { FamiliesService } from "../families/families.service";
import { SpeciesService } from "../species/species.service";
import { GenusService } from "../genus/genus.service";
import { BotanistsService } from "../botanists/botanists.service";
import { EnvironmentsService } from "../environments/environments.service";
import { LocationsService } from "../locations/locations.service";
import { CreateExsiccataDto } from "./dto/create-exsiccata.dto";
import { Family } from "../families/entities/family.entity";
import { Genus } from "../genus/entities/genus.entity";
import { Botanist } from "../botanists/entities/botanist.entity";
import { Environment } from "../environments/entities/environment.entity";
import { IPaginationOptions, Pagination } from "nestjs-typeorm-paginate";
import { UpdateExsiccataDto } from "./dto/update-exsiccata.dto";

@Injectable()
export class ExsiccataService {
  constructor(
    @InjectRepository(Exsiccata)
    private exsiccataRepository: Repository<Exsiccata>,

    private familiesService: FamiliesService,
    private speciesService: SpeciesService,
    private genusService: GenusService,
    private botanistsService: BotanistsService,
    private locationService: LocationsService,
    private environmentService: EnvironmentsService
  ) { }

  async create(createExsiccataDto: CreateExsiccataDto) {
    const { familyId, speciesId, collectorId, genusId, environmentId, determinatorId, locationId, ...exsiccataData } = createExsiccataDto;
    const collection_number: number = (await this.findAllByCollectorId(collectorId))?.length;
    
    createExsiccataDto.collectionNumberPerCollector = collection_number + 1;

    const family = await this.familiesService.findOne(familyId);

    if (!family) {
      throw new NotFoundException('Familia');
    }

    let species = await this.speciesService.findOne(speciesId);

    if (!species) {
      throw new NotFoundException('Especie')
    }

    createExsiccataDto.scientificName = `${family.name} ${species.name}`;

    let genus: Genus = await this.genusService.findOne(genusId);

    if (!genus) {
      throw new NotFoundException('Especie')
    }

    let collector: Botanist = await this.botanistsService.findOne(collectorId);

    if (!collector) {
      throw new NotFoundException('Coletor')
    }

    let determinator: Botanist = await this.botanistsService.findOne(determinatorId);

    if (!determinator) {
      throw new NotFoundException('Determinator')
    }

    let location = await this.locationService.findOne(locationId);

    if (!location) {
      throw new NotFoundException('Location')
    }

    const exsiccata = await this.exsiccataRepository.create(createExsiccataDto);

    if (!exsiccata) {
      throw new NotFoundException('Exsicata')
    }

    let environment: Environment = await this.environmentService.findOne(environmentId);

    if (!environment) {
      throw new NotFoundException('environment')
    }

    exsiccata.families = [family];
    exsiccata.species = [species];
    exsiccata.genus = [genus];
    exsiccata.collector = collector;
    exsiccata.determinator = determinator;
    exsiccata.location = location;
    exsiccata.environment = environment;

    return this.exsiccataRepository.save(exsiccata);
  }

  async findAll(): Promise<Exsiccata[]> {
    const exsiccatas = await this.exsiccataRepository
      .createQueryBuilder('exsiccata')
      .leftJoinAndSelect('exsiccata.families', 'family')
      .leftJoinAndSelect('exsiccata.species', 'species')
      .leftJoinAndSelect('exsiccata.genus', 'genus')
      .leftJoinAndSelect('exsiccata.collector', 'collector') // Alias para o coletor
      .leftJoinAndSelect('exsiccata.determinator', 'determinator')
      .leftJoinAndSelect('exsiccata.location', 'location_table')
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
      const queryBuilder =  this.exsiccataRepository.createQueryBuilder('exsiccata')
  
        .leftJoinAndSelect('exsiccata.families', 'family')
        .leftJoinAndSelect('exsiccata.species', 'species')
        .leftJoinAndSelect('exsiccata.genus', 'genus')
        .leftJoinAndSelect('exsiccata.collector', 'collector')
        .leftJoinAndSelect('exsiccata.determinator', 'determinator')
        .leftJoinAndSelect('exsiccata.location', 'location_table')
  
      if (scientificName) {
        queryBuilder.andWhere('exsiccata.scientificName LIKE :scientificName', {
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
        queryBuilder.andWhere('exsiccata.commonName LIKE :commonName', {
          commonName: `%${commonName}%`,
        });
      }
  
      if (growthHabit) {
        queryBuilder.andWhere('exsiccata.growthHabit LIKE :growthHabit', {
          growthHabit: `%${growthHabit}%`,
        });
      }
  
      if (color) {
        queryBuilder.andWhere('exsiccata.color LIKE :color', {
          color: `%${color}%`,
        });
      }
  
      if (familyName) {
        queryBuilder.andWhere('family.name LIKE :familyName', { familyName: `%${familyName}%` });
      }
  
      if (speciesName) {
        queryBuilder.andWhere('species.name LIKE :speciesName', { speciesName: `%${speciesName}%` });
      }
  
      if (genusName) {
        queryBuilder.andWhere('genus.name LIKE :genusName', { genusName: `%${genusName}%` });
      }  
      
      if (collectorName) {
        queryBuilder.andWhere('collector.name LIKE :collectorName', { collectorName: `%${collectorName}%` });
      }
    
      if (determinatorName) {
        queryBuilder.andWhere('determinator.name LIKE :determinatorName', { determinatorName: `%${determinatorName}%` });
      }
    
      if (environmentName) {
        queryBuilder.andWhere('environment.name LIKE :environmentName', { environmentName: `%${environmentName}%` });
      }    
 
    // queryBuilder.where('exsiccata.removed = :removed', { removed: false });
    const paginatedResults = await this.paginate(queryBuilder, options);

    return paginatedResults;
  }

  async findOne(id: number) {
    const exsiccata = await this.exsiccataRepository.createQueryBuilder('exsiccata')
      .leftJoinAndSelect('exsiccata.families', 'family')
      .leftJoinAndSelect('exsiccata.species', 'species')
      .leftJoinAndSelect('exsiccata.genus', 'genus')
      .leftJoinAndSelect('exsiccata.collector', 'collector') 
      .leftJoinAndSelect('exsiccata.determinator', 'determinator')
      .leftJoinAndSelect('exsiccata.location', 'location_table')
      .where('exsiccata.id = :id', { id })
      .getOne();

    if (!exsiccata) {
      throw new NotFoundException(`Exsicata com ID ${id} não encontrada`);
    }

    return exsiccata;
  }

  update(id: number, updateExsiccataDto: UpdateExsiccataDto) {

    return this.exsiccataRepository.update(id, updateExsiccataDto);
  }

  remove(id: number) {
    return this.exsiccataRepository.delete(id);
  }

  async findAllByCollectorId(collectorId: number) {
    return await this.exsiccataRepository.find({
      where: { collector: { id: collectorId } },
    });
  }

  async paginate(queryBuilder: SelectQueryBuilder<Exsiccata>, options: IPaginationOptions): Promise<Pagination<Exsiccata>> {
    return await this.paginate(queryBuilder, options);
  }
 

}
