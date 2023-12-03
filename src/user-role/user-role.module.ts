import { Module } from '@nestjs/common';
import { UserRoleService } from './user-role.service';
import { UserRoleController } from './user-role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { RoleEntity } from '../role/entities/role.entity';
import { UserRole } from './entities/user-role.entity';
import { RoleService } from '../role/role.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRole])],
  controllers: [UserRoleController],
  providers: [UserRoleService, RoleService]
})
export class UserRoleModule {}
