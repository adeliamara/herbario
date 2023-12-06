import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFamilyDto } from './dto/create-family.dto';
import { UpdateFamilyDto } from './dto/update-family.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Family } from './entities/family.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { NotFoundError } from 'rxjs';

@Injectable()
export class FamiliesService {
  constructor(
    @InjectRepository(Family)
    private familyRepository: Repository<Family>
  ){}

  create(createFamilyDto: CreateFamilyDto) {
    const dataToSave = {
      name: createFamilyDto.name,
    };
    
    return this.familyRepository.save(dataToSave);
  }

  findAll() {
    return this.familyRepository.find() ;
  }

  findOne(id: number) {
    return this.familyRepository.findOneBy({ id: id })
  }

  findOneWithDeleted(id: number) {
    return this.familyRepository
      .createQueryBuilder('family')
      .where('family.id = :id', { id })
      .orWhere('family.deletedAt IS NOT NULL')
      .withDeleted()
      .getOne();
  }

  update(id: number, updateFamilyDto: UpdateFamilyDto) {
    return this.familyRepository.update(id, updateFamilyDto);
  }

  async isFamilyReferenced(id: number): Promise<boolean> {
    const queryBuilder: SelectQueryBuilder<Family> = await this.familyRepository
    .createQueryBuilder('family');

    queryBuilder
      .leftJoinAndSelect('family.exsiccatas', 'exsiccata_family')
      .where('family.id = :id', { id });

    const result = await queryBuilder.getOne();

    if (result) {
      const exsicatas = result.exsiccatas.filter(exsicata => exsicata.deletedAt === null);
      return exsicatas.length > 0;
    }

    return false;
  }

  async remove(id: number) {
    const isReferenced = await this.isFamilyReferenced(id);

    if (isReferenced) {
      throw new ConflictException('Não é possível excluir a família, pois está associada a exsicatas não removidas.');
    }

    const family: Family = await this.findOne(id);

    if (!family) {
      throw new NotFoundException(`Family with ID ${id} not found`);
    }

    return await this.familyRepository.softRemove(family);
  }

  async restore(id: number): Promise<Family> {
    const family: Family = await this.findOneWithDeleted(id);

    if (!family) {
      throw new NotFoundException(`Family with ID ${id} not found`);
    }

    family.restore();

    return this.familyRepository.save(family);
  }
}
