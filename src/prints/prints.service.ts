import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePrintDto } from './dto/create-print.dto';
import { UpdatePrintDto } from './dto/update-print.dto';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Print } from './entities/print.entity';
import { Repository } from 'typeorm';
import { ExsiccataService } from '../exsiccata/exsiccata.service';

@Injectable()
export class PrintsService {
  constructor(
    @InjectRepository(Print)
    private readonly printRepository: Repository<Print>,
    private readonly exsiccataService: ExsiccataService,

  ) { }

  create(userReq: User, createPrintDto: CreatePrintDto) {
    console.log(createPrintDto)

    createPrintDto.userId = userReq.id;
    console.log(createPrintDto)
    const print = this.printRepository.create(createPrintDto);
    console.log(print)
    return this.printRepository.save(print);
  }

  async findAllPrintsByUser(userReq: User): Promise<Print[]> {
    return await this.printRepository.find({
      where: { userId: userReq.id },
    });
  }

  async findAllExsicatasForPrintByUser(userReq: User) {
    const prints: Print[] = await this.findAllPrintsByUser(userReq);

    const exsiccataIds = prints.map(print => print.exsicataId);

    return await this.exsiccataService.findByIds(exsiccataIds);
  }

  async findOne(userId: number, exsicataId: number) {
    const print = await this.printRepository.findOneBy({ userId, exsicataId });
    if (!print) {
      throw new NotFoundException('Registro não encontrado');
    }
    return print;
  }

  async findOneRegister(userId: number, exsicataId: number) {
    const print = await this.printRepository.findOneBy({ userId, exsicataId });
    if (!print) {
      throw new NotFoundException('Registro não encontrado');
    }
    return await this.exsiccataService.findByIds([print.exsicataId]);
  }

  async remove(userReq: User, exsicataId: number) {
    const print: Print = await this.findOne(userReq.id, exsicataId)
    return this.printRepository.remove(print);
  }

  async clearAllListForPrint(userReq: User) {
    const prints: Print[] = await this.findAllPrintsByUser(userReq)
    return this.printRepository.remove(prints);
  }
}
