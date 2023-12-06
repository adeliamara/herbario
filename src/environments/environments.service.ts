import { Injectable } from '@nestjs/common';
import { CreateEnvironmentDto } from './dto/create-environment.dto';
import { UpdateEnvironmentDto } from './dto/update-environment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Environment } from './entities/environment.entity';

@Injectable()
export class EnvironmentsService {
  constructor(
    @InjectRepository(Environment)
    private environmentRepository: Repository<Environment>
  ){}

  create(createEnvironmentDto: CreateEnvironmentDto) {
    const dataToSave = {
      name: createEnvironmentDto.name,
    };
    return this.environmentRepository.save(dataToSave);
  }

  findAll() {
    return this.environmentRepository.find() ;
  }

  findOne(id: number) {
    return this.environmentRepository.findOneBy({ id: id })
  }

  update(id: number, updateEnvironmentDto: UpdateEnvironmentDto) {
    const dataToSave = {
      name: updateEnvironmentDto.name,
    };

    return this.environmentRepository.update(id, dataToSave);
  }

  async remove(id: number) {
    const environment: Environment = await this.findOne(id)
    return this.environmentRepository.softRemove(environment);
  }

}
