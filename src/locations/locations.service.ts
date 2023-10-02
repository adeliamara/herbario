import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>
  ) { }

  create(createLocationDto: CreateLocationDto) {

    const dataToSave = {
      city: createLocationDto.city,
      state: createLocationDto.state,
    };

    return this.locationRepository.save(dataToSave);
  }

  findAll() {
    return this.locationRepository.find();
  }

  findOne(id: number) {
    return this.locationRepository.findOneBy({ id: id })
  }

  update(id: number, updateLocationDto: UpdateLocationDto) {
    const dataToSave = {
      city: updateLocationDto.city,
      state: updateLocationDto.state,
    };

    return this.locationRepository.update(id, dataToSave);
  }

  remove(id: number) {
    return this.locationRepository.delete(id);
  }

  async findAllStates(): Promise<Location[]> {
    const query = this.locationRepository.createQueryBuilder('location_table').select('DISTINCT location_table.state', 'state');

    const result = await query.getRawMany();

    return result;
  }


  async findAllCitiesByStateName(state: string): Promise<Location[]> {
    console.log(state)
    const queryBuilder = this.locationRepository.createQueryBuilder('location_table')
      .where('location_table.state ilike :state', { state: '%' + state + '%' });

    const result = await queryBuilder.getRawMany();

    return result;
  }
}
