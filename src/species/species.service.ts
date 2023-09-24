import { Injectable } from '@nestjs/common';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { UpdateSpeciesDto } from './dto/update-species.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Species } from './entities/species.entity';

@Injectable()
export class SpeciesService {
  constructor(
    @InjectRepository(Species)
    private speciesRepository: Repository<Species>
  ){}

  create(createSpeciesDto: CreateSpeciesDto) {
    const dataToSave = {
      name: createSpeciesDto.name,
    };
    return this.speciesRepository.save(dataToSave);
  }

  findAll() {
    return this.speciesRepository.find() ;
  }

  findOne(id: number) {
    return this.speciesRepository.findOneBy({ id: id })
  }

  update(id: number, updateSpeciesDto: UpdateSpeciesDto) {
    const dataToSave = {
      name: updateSpeciesDto.name,
    };

    return this.speciesRepository.update(id, dataToSave);
  }

  remove(id: number) {
    return this.speciesRepository.delete(id);
  }
}
