import { Injectable } from '@nestjs/common';
import { CreateExsiccataFamilyDto } from './dto/create-exsiccata-family.dto';
import { UpdateExsiccataFamilyDto } from './dto/update-exsiccata-family.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExsiccataFamily } from './entities/exsiccata-family.entity';

@Injectable()
export class ExsiccataFamilyService {
  constructor(
    @InjectRepository(ExsiccataFamily)
    private exsiccataFamilyRepository: Repository<ExsiccataFamily>
  ){}

  create(createExsiccataFamilyDto: CreateExsiccataFamilyDto) {
    return this.exsiccataFamilyRepository.save(createExsiccataFamilyDto);
  }

  findAll() {
    return this.exsiccataFamilyRepository.find() ;
  }

  update(id: number, updateExsiccataFamilyDto: UpdateExsiccataFamilyDto) {
    return this.exsiccataFamilyRepository.update(id, updateExsiccataFamilyDto);
  }

  remove(id: number) {
    return this.exsiccataFamilyRepository.delete(id);
  }
}
