import { Injectable } from '@nestjs/common';
import { CreateGenusDto } from './dto/create-genus.dto';
import { UpdateGenusDto } from './dto/update-genus.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genus } from './entities/genus.entity';

@Injectable()
export class GenusService {
  constructor(
    @InjectRepository(Genus)
    private genusRepository: Repository<Genus>
  ){}

  create(createGenusDto: CreateGenusDto) {
    const dataToSave = {
      name: createGenusDto.name,
    };
    return this.genusRepository.save(dataToSave);
  }

  findAll() {
    return this.genusRepository.find() ;
  }

 async findOne(id: number) {
    return this.genusRepository.findOneBy({ id: id })
  }

  update(id: number, updateGenusDto: UpdateGenusDto) {
    const dataToSave = {
      name: updateGenusDto.name,
    };

    return this.genusRepository.update(id, dataToSave);
  }

  remove(id: number) {
    return this.genusRepository.delete(id);
  }
}
