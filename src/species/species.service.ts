import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { UpdateSpeciesDto } from './dto/update-species.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
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

  async isSpeciesReferenced(id: number): Promise<boolean> {
    const queryBuilder: SelectQueryBuilder<Species> = await this.speciesRepository
    .createQueryBuilder('species');

    queryBuilder
      .leftJoinAndSelect('species.exsiccatas', 'exsiccata_Species')
      .where('species.id = :id', { id });

    const result = await queryBuilder.getOne();

    if (result) {
      const exsicatas = result.exsiccatas.filter(exsicata => exsicata.deletedAt === null);
      return exsicatas.length > 0;
    }

    return false;
  }

  findOneWithDeleted(id: number) {
    return this.speciesRepository
      .createQueryBuilder('species')
      .where('species.id = :id', { id })
      .orWhere('species.deletedAt IS NOT NULL')
      .withDeleted()
      .getOne();
  }

  async remove(id: number) {
    const isReferenced = await this.isSpeciesReferenced(id);

    if (isReferenced) {
      throw new ConflictException('Não é possível excluir a família, pois está associada a exsicatas não removidas.');
    }

    const species: Species = await this.findOne(id);

    if (!species) {
      throw new NotFoundException(`species with ID ${id} not found`);
    }

    return await this.speciesRepository.softRemove(species);
  }

  async restore(id: number): Promise<Species> {
    const species: Species = await this.findOneWithDeleted(id);

    if (!species) {
      throw new NotFoundException(`species with ID ${id} not found`);
    }

    species.restore();

    return this.speciesRepository.save(species);
  }
}
