import { Injectable } from '@nestjs/common';
import { CreateFamilyDto } from './dto/create-family.dto';
import { UpdateFamilyDto } from './dto/update-family.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Family } from './entities/family.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FamiliesService {
  constructor(
    @InjectRepository(Family)
    private familyRepository: Repository<Family>
  ){}

  create(createFamilyDto: CreateFamilyDto) {
    const dataToSave = {
      name: createFamilyDto.name,
    };
    
    return this.familyRepository.save(dataToSave);
  }

  findAll() {
    return this.familyRepository.find() ;
  }

  findOne(id: number) {
    return this.familyRepository.findOne({});
  }

  update(id: number, updateFamilyDto: UpdateFamilyDto) {
    return this.familyRepository.update(id, updateFamilyDto);
  }

  remove(id: number) {
    return this.familyRepository.delete(id);
  }
}
