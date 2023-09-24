import { Injectable } from '@nestjs/common';
import { CreateExsiccataFamilyDto } from './dto/create-exsiccata-family.dto';
import { UpdateExsiccataFamilyDto } from './dto/update-exsiccata-family.dto';

@Injectable()
export class ExsiccataFamilyService {
  create(createExsiccataFamilyDto: CreateExsiccataFamilyDto) {
    return 'This action adds a new exsiccataFamily';
  }

  findAll() {
    return `This action returns all exsiccataFamily`;
  }

  findOne(id: number) {
    return `This action returns a #${id} exsiccataFamily`;
  }

  update(id: number, updateExsiccataFamilyDto: UpdateExsiccataFamilyDto) {
    return `This action updates a #${id} exsiccataFamily`;
  }

  remove(id: number) {
    return `This action removes a #${id} exsiccataFamily`;
  }
}
