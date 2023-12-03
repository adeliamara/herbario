import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from './entities/user-role.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Role } from '../setup/enums/role.enum';
import { RoleEntity } from '../role/entities/role.entity';
import { RoleService } from '../role/role.service';

@Injectable()
export class UserRoleService {
  constructor(
    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>, 
    private readonly roleService: RoleService
  ){}

  create(userReq: User, createUserRoleDto: CreateUserRoleDto) {
    const isAdmin = this.roleService.userHasRolePermission(userReq, Role.ADMIN);

    if (!isAdmin) {
      throw new ForbiddenException('Você não tem permissão para adicionar uma nova regra!')
    }
    const userRole = this.userRoleRepository.create(createUserRoleDto);
    return this.userRoleRepository.save(userRole);
  }

  findAll(userReq: User) {
    const isAdmin = this.roleService.userHasRolePermission(userReq, Role.ADMIN);

    if (!isAdmin) {
      throw new ForbiddenException()
    }
    return this.userRoleRepository.find();
  }

  findOne(userReq: User,roleId: number, userId: number) {
    const isAdmin = this.roleService.userHasRolePermission(userReq, Role.ADMIN);

    if (!isAdmin) {
      throw new ForbiddenException()
    }
    return this.userRoleRepository.findOneBy({ roleId: roleId, userId });
  }

  remove(userReq: User, roleId: number, userId: number) {
    const isAdmin = this.roleService.userHasRolePermission(userReq, Role.ADMIN);

    if (!isAdmin) {
      throw new ForbiddenException();
    }
    return this.userRoleRepository.delete({ roleId, userId });
  }
}
