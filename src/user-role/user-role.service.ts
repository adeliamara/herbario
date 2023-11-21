import { Injectable } from '@nestjs/common';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from './entities/user-role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRoleService {
  constructor(
    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>
  ){}

  create(createUserRoleDto: CreateUserRoleDto) {
    const userRole = this.userRoleRepository.create(createUserRoleDto);
    return this.userRoleRepository.save(userRole);
  }

  findAll() {
    return this.userRoleRepository.find();
  }

  findOne(roleId: number, userId: number) {
    return this.userRoleRepository.findOneBy({ roleId: roleId, userId });
  }

  update(roleId: number, userId: number, updateUserRoleDto: UpdateUserRoleDto) {
    return this.userRoleRepository.update({ roleId, userId }, updateUserRoleDto);
  }

  remove(roleId: number, userId: number) {
    return this.userRoleRepository.delete({ roleId, userId });
  }
}
