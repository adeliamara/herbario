import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBotanistDto } from './dto/create-botanist.dto';
import { UpdateBotanistDto } from './dto/update-botanist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Botanist } from './entities/botanist.entity';
import { NotFoundError } from 'rxjs';

@Injectable()
export class BotanistsService {
  constructor(
    @InjectRepository(Botanist)
    private botanistRepository: Repository<Botanist>
  ) { }

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
    return this.botanistRepository.find();
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

  findOneWithDeleted(id: number) {
    return this.botanistRepository
      .createQueryBuilder('botanist')
      .where('botanist.id = :id', { id })
      .orWhere('botanist.deletedAt IS NOT NULL')
      .withDeleted()
      .getOne();
  }

  async isBotanistReferenced(id: number): Promise<boolean> {
    const queryBuilder: SelectQueryBuilder<Botanist> = await this.botanistRepository
      .createQueryBuilder('botanist');

    queryBuilder
      .leftJoinAndSelect('botanist.collectedExsiccatas', 'collectedExsiccata')
      .leftJoinAndSelect('botanist.determinedExsiccatas', 'determinedExsiccata')
      .where('botanist.id = :id', { id });

    const result = await queryBuilder.getOne();

    if (result) {
      const exsicatasDetermined = result.determinedExsiccatas.filter(exsicata => exsicata.deletedAt === null);
      const exsicatasCollected = result.collectedExsiccatas.filter(exsicata => exsicata.deletedAt === null);
      return exsicatasDetermined.length > 0 || exsicatasCollected.length > 0;
    }

    return false;
  }

  async remove(id: number) {
    const isReferenced = await this.isBotanistReferenced(id);

    if (isReferenced) {
      throw new ConflictException('Não é possível excluir a família, pois está associada a exsicatas não removidas.');
    }

    const botanist: Botanist = await this.findOne(id);

    if (!botanist) {
      throw new NotFoundError(`Botanist with ID ${id} not found`);
    }

    return await this.botanistRepository.softRemove(botanist);
  }

  async restore(id: number): Promise<Botanist> {
    const botanist: Botanist = await this.findOneWithDeleted(id);

    if (!botanist) {
      throw new NotFoundException(`Botanist with ID ${id} not found`);
    }

    botanist.restore();

    return this.botanistRepository.save(botanist);
  }
}
