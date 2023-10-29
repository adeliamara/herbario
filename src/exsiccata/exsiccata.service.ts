import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExsiccataDto } from './dto/create-exsiccata.dto';
import { UpdateExsiccataDto } from './dto/update-exsiccata.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
  ){}

  async create(createExsiccataDto: CreateExsiccataDto) {
    const {familyId, speciesId, genusId, collectorId, locationId, environmentId, determinatorId, ...exsiccataData} = createExsiccataDto;
    
    const collection_number: number = (await this.findAllByCollectorId(collectorId)).length;
    createExsiccataDto.collectionNumberPerCollector = collection_number + 1;

    let family: Family = await this.familyService.findOne(familyId);
    
    if(!family){
      throw new NotFoundException('Familia')
    }

    let species: Species = await this.speciesService.findOne(speciesId);
    
    if(!species){
      throw new NotFoundException('Especie')
    }

    createExsiccataDto.scientificName = `${family.name} ${species.name}`;

    let genus: Genus = await this.genusService.findOne(genusId);

    if(!genus){
      throw new NotFoundException('Genero')
    }

    let collector: Botanist = await this.botanistsService.findOne(collectorId);

    if(!collector){
      throw new NotFoundException('Coletor')
    }

    let determinator: Botanist = await this.botanistsService.findOne(determinatorId);

    if(!determinator){
      throw new NotFoundException('Determinator')
    }

    let location: Location = await this.locationService.findOne(locationId);

    if(!location){
      throw new NotFoundException('Location')
    }

    const exsiccata = await this.exsiccataRepository.create(createExsiccataDto);

    if(!exsiccata){
      throw new NotFoundException('Exsicata')
    }

    let environment: Environment = await this.environmentService.findOne(environmentId);

    if(!environment){
      throw new NotFoundException('environment')
    }

    exsiccata.families = [family];
    exsiccata.species = [species];
    exsiccata.genus = [genus];
    exsiccata.collector = collector;
    exsiccata.determinator = determinator;
    exsiccata.location = location;
    exsiccata.environment = environment;

    console.log(exsiccata)

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

  async findOne(id: number) {
    const exsiccata = await this.exsiccataRepository
    .createQueryBuilder('exsiccata')
    .leftJoinAndSelect('exsiccata.families', 'family')
    .leftJoinAndSelect('exsiccata.species', 'species')
    .leftJoinAndSelect('exsiccata.genus', 'genus')
    .leftJoinAndSelect('exsiccata.collector', 'collector') // Alias para o coletor
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

    return this.exsiccataRepository.update(id,updateExsiccataDto );
  }

  remove(id: number) {
    return this.exsiccataRepository.delete(id);
  }
  
  async  findAllByCollectorId(collectorId: number) {
    return await this.exsiccataRepository.find({
      where: { collector: { id: collectorId } },
    });
  }
}
