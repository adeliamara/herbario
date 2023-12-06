import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateGenusDto } from './dto/create-genus.dto';
import { UpdateGenusDto } from './dto/update-genus.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
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

  findOne(id: number) {
    return this.genusRepository.findOneBy({ id: id })
  }

  async isGenusReferenced(id: number): Promise<boolean> {
    const queryBuilder: SelectQueryBuilder<Genus> = await this.genusRepository
    .createQueryBuilder('genus');

    queryBuilder
      .leftJoinAndSelect('genus.exsiccatas', 'exsiccata_genus')
      .where('genus.id = :id', { id });

    const result = await queryBuilder.getOne();

    if (result) {
      const exsicatas = result.exsiccatas.filter(exsicata => exsicata.deletedAt === null);
      return exsicatas.length > 0;
    }

    return false;
  }

  async remove(id: number) {
    const isReferenced = await this.isGenusReferenced(id);

    if (isReferenced) {
      throw new ConflictException('Não é possível excluir o genero, pois está associada a exsicatas não removidas.');
    }

    const genus: Genus = await this.findOne(id);

    if (!genus) {
      throw new NotFoundException(`Genero com ID ${id} não encontrado`);
    }

    return await this.genusRepository.softRemove(genus);
  }

  update(id: number, updateGenusDto: UpdateGenusDto) {
    const dataToSave = {
      name: updateGenusDto.name,
    };

    return this.genusRepository.update(id, dataToSave);
  }

  async restore(id: number): Promise<Genus> {
    const genus: Genus = await this.findOneWithDeleted(id);

    if (!genus) {
      throw new NotFoundException(`Genus with ID ${id} not found`);
    }

    genus.restore();

    return this.genusRepository.save(genus);
  }

  findOneWithDeleted(id: number) {
    return this.genusRepository
      .createQueryBuilder('genus')
      .where('genus.id = :id', { id })
      .orWhere('genus.deletedAt IS NOT NULL')
      .withDeleted()
      .getOne();
  }
}
