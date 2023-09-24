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

@Injectable()
export class ExsiccataService {
  constructor(
    @InjectRepository(Exsiccata)
    private exsiccataRepository: Repository<Exsiccata>,
    
    private familyService: FamiliesService,
    private speciesService: FamiliesService,
    private genusService: GenusService,
  ){}

  async create(createExsiccataDto: CreateExsiccataDto) {
    const {familyId, speciesId, genusId, ...exsicataData} = createExsiccataDto;
    const exsiccata = await this.exsiccataRepository.save(createExsiccataDto);
    if(!exsiccata){
      throw new NotFoundException()
    }

    let family: Family = await this.familyService.findOne(familyId);
    
    if(!family){
      throw new NotFoundException()
    }

    let species: Species = await this.speciesService.findOne(speciesId);
    
    if(!species){
      throw new NotFoundException()
    }

    let genus: Genus = await this.genusService.findOne(genusId);


    if(!genus){
      throw new NotFoundException()
    }

    exsiccata.families = [family]
    exsiccata.species = [species]
    exsiccata.genus = [genus]
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
}
