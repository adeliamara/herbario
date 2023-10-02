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
import { CollectorsService } from 'src/collectors/collectors.service';
import { Collector } from 'src/collectors/entities/collector.entity';
import { LocationsService } from 'src/locations/locations.service';
import { Location } from 'src/locations/entities/location.entity';
import { SpeciesService } from 'src/species/species.service';

@Injectable()
export class ExsiccataService {
  constructor(
    @InjectRepository(Exsiccata)
    private exsiccataRepository: Repository<Exsiccata>,
    
    private familyService: FamiliesService,
    private speciesService: SpeciesService,
    private genusService: GenusService,
    private collectorsService: CollectorsService,
    private locationService: LocationsService,
  ){}

  async create(createExsiccataDto: CreateExsiccataDto) {
    const {familyId, speciesId, genusId, collectorId, locationId, ...exsiccataData} = createExsiccataDto;
    
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

    let collector: Collector = await this.collectorsService.findOne(collectorId);

    if(!collector){
      throw new NotFoundException('Coletor')
    }

    let location: Location = await this.locationService.findOne(locationId);

    if(!location){
      throw new NotFoundException('Location')
    }

    //criar instancia sem salvar no banco  (new Exsiccata)
    const exsiccata = await this.exsiccataRepository.save(createExsiccataDto);

    if(!exsiccata){
      throw new NotFoundException('Exsicata')
    }

    exsiccata.families = [family];
    exsiccata.species = [species];
    exsiccata.genus = [genus];
    exsiccata.collector = collector;
    exsiccata.location = location;

    return this.exsiccataRepository.save(exsiccata); 
  }

  findAll() {
    return this.exsiccataRepository.find() ;
  }

  findOne(id: number) {
    return this.exsiccataRepository.findOneBy({ id: id })
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
