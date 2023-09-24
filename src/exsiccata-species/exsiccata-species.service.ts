import { Injectable } from '@nestjs/common';
import { CreateExsiccataSpeciesDto } from './dto/create-exsiccata-species.dto';
import { UpdateExsiccataSpeciesDto } from './dto/update-exsiccata-species.dto';

@Injectable()
export class ExsiccataSpeciesService {
  create(createExsiccataSpecyDto: CreateExsiccataSpeciesDto) {
    return 'This action adds a new exsiccataSpecy';
  }

  findAll() {
    return `This action returns all exsiccataSpecies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} exsiccataSpecy`;
  }

  update(id: number, updateExsiccataSpecyDto: UpdateExsiccataSpeciesDto) {
    return `This action updates a #${id} exsiccataSpecy`;
  }

  remove(id: number) {
    return `This action removes a #${id} exsiccataSpecy`;
  }
}
