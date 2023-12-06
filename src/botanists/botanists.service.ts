import { Injectable } from '@nestjs/common';
import { CreateBotanistDto } from './dto/create-botanist.dto';
import { UpdateBotanistDto } from './dto/update-botanist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Botanist } from './entities/botanist.entity';

@Injectable()
export class BotanistsService {
  constructor(
    @InjectRepository(Botanist)
    private botanistRepository: Repository<Botanist>
  ){}

  async create(createBotanistDto: CreateBotanistDto) {
    const dataToSave = {
      name: createBotanistDto.name,
      actualCollectNumber: 0,
      institution: createBotanistDto.institution,
      email: createBotanistDto.email
    };
    return this.botanistRepository.save(dataToSave);
  }

  findAll() {
    return this.botanistRepository.find() ;
  }

  findOne(id: number) {
    return this.botanistRepository.findOneBy({ id: id })
  }

  update(id: number, updateBotanistDto: UpdateBotanistDto) {
    const dataToSave = {
      name: updateBotanistDto.name,
    };

    return this.botanistRepository.update(id, dataToSave);
  }

  async remove(id: number) {
    const botanist: Botanist = await this.findOne(id)
    return this.botanistRepository.softRemove(botanist);
  }

}
