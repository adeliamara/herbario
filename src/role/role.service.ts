import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { User } from '../users/entities/user.entity';
import { Role } from '../setup/enums/role.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>
  ){}

  userHasRolePermission(user: User, roleExpected: Role): boolean {
    return user?.roles?.some(role => role.name.trim() === roleExpected);
  }

  async findAll() {
    return await this.roleRepository.find()
  }

  async findOne(id: number) {
    return await this.roleRepository.findOneBy({ id: id })
  }

}
