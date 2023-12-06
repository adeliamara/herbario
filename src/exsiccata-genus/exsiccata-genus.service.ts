import { Injectable } from '@nestjs/common';
import { CreateExsiccataGenusDto } from './dto/create-exsiccata-genus.dto';
import { UpdateExsiccataGenusDto } from './dto/update-exsiccata-genus.dto';

@Injectable()
export class ExsiccataGenusService {
  create(createExsiccataGenuDto: CreateExsiccataGenusDto) {
    return 'This action adds a new exsiccataGenu';
  }

  findAll() {
    return `This action returns all exsiccataGenus`;
  }

  findOne(id: number) {
    return `This action returns a #${id} exsiccataGenu`;
  }

  update(id: number, updateExsiccataGenuDto: UpdateExsiccataGenusDto) {
    return `This action updates a #${id} exsiccataGenu`;
  }

 

}
