import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExsiccataDto } from './dto/create-exsiccata.dto';
import { UpdateExsiccataDto } from './dto/update-exsiccata.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exsiccata } from './entities/exsiccata.entity';
import { ExsiccataFamily } from 'src/exsiccata-family/entities/exsiccata-family.entity';
import { Family } from 'src/families/entities/family.entity';
import { FamiliesService } from 'src/families/families.service';

@Injectable()
export class ExsiccataService {
  constructor(
    @InjectRepository(Exsiccata)
    private exsiccataRepository: Repository<Exsiccata>,
    
    private familyService: FamiliesService,

    @InjectRepository(ExsiccataFamily)
    private exsiccataFamilyRepository: Repository<ExsiccataFamily>,
  ){}

  async create(createExsiccataDto: CreateExsiccataDto) {
    const {familyId, ...exsicataData} = createExsiccataDto;
    const exsiccata = await this.exsiccataRepository.save(createExsiccataDto);
    if(!exsiccata){
      throw new NotFoundException()
    }

    let family: Family = await this.familyService.findOne(familyId);
    
    if(!family){
      throw new NotFoundException()
    }

    exsiccata.families = [family]
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

  async createExsiccataFamily(exsiccataId: number, familyId: number): Promise<void> {

    const exsiccata = await this.findOne(exsiccataId);

    if(!exsiccata){
    throw new NotFoundException()
    }
    const family = await this.familyService.findOne(familyId);

    if(!family){
    throw new NotFoundException()
    }
    
    await this.exsiccataFamilyRepository.save({exsiccataId: exsiccataId, familyId: familyId})
  }
}
