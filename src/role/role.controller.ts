import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { AuthGuard } from '../setup/guards/auth.guard';
import { RolesGuard } from '../setup/guards/roles.guard';
import { Roles } from '../setup/decorators/roles.decorator';
import { Role } from '../setup/enums/role.enum';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
  //   return this.roleService.update(+id, updateRoleDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.roleService.remove(+id);
  // }
}
