import { Injectable } from '@nestjs/common';
import { CreateCollectorDto } from './dto/create-collector.dto';
import { UpdateCollectorDto } from './dto/update-collector.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collector } from './entities/collector.entity';

@Injectable()
export class CollectorsService {
  constructor(
    @InjectRepository(Collector)
    private collectorRepository: Repository<Collector>
  ){}

  create(createCollectorDto: CreateCollectorDto) {
    const dataToSave = {
      name: createCollectorDto.name,
    };

    return this.collectorRepository.save(dataToSave);
  }

  findAll() {
    return this.collectorRepository.find() ;
  }

  findOne(id: number) {
    return this.collectorRepository.findOneBy({ id: id })
  }

  update(id: number, updateCollectorDto: UpdateCollectorDto) {
    const dataToSave = {
      name: updateCollectorDto.name,
    };

    return this.collectorRepository.update(id, dataToSave);
  }

  remove(id: number) {
    return this.collectorRepository.delete(id);
  }
}
