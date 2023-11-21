import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UserRoleService } from './user-role.service';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';

@Controller('user-roles') 
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) {}

  @Post()
  create(@Body() createUserRoleDto: CreateUserRoleDto) {
    return this.userRoleService.create(createUserRoleDto);
  }

  @Get()
  findAll() {
    return this.userRoleService.findAll();
  }

  @Get(':roleId/:userId')
  findOne(@Param('roleId') roleId: number, @Param('userId') userId: number) {
    return this.userRoleService.findOne(roleId, userId);
  }

  @Put(':roleId/:userId')
  update(@Param('roleId') roleId: number, @Param('userId') userId: number, @Body() updateUserRoleDto: UpdateUserRoleDto) {
    return this.userRoleService.update(roleId, userId, updateUserRoleDto);
  }

  @Delete(':roleId/:userId')
  remove(@Param('roleId') roleId: number, @Param('userId') userId: number) {
    return this.userRoleService.remove(roleId, userId);
  }
}
