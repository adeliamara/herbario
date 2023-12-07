import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Req } from '@nestjs/common';
import { UserRoleService } from './user-role.service';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { AuthGuard } from '../setup/guards/auth.guard';
import { RolesGuard } from '../setup/guards/roles.guard';
import { Role } from '../setup/enums/role.enum';
import { Roles } from '../setup/decorators/roles.decorator';
import { User } from '../users/entities/user.entity';
import { Request } from 'express';

@Controller('user-roles') 
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  create(@Body() createUserRoleDto: CreateUserRoleDto, @Req() request: Request) {    
    const userReq:  User = request.user as unknown as User;
    return this.userRoleService.create(userReq, createUserRoleDto);
  }
  
  @Get(':userId/:roleId')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  findOne(@Param('roleId') roleId: number, @Param('userId') userId: number, @Req() request: Request) {    
    const userReq:  User = request.user as unknown as User;
    return this.userRoleService.findOne(userReq, roleId, userId);
  }

  @Delete(':userId/:roleId')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  remove(@Param('roleId') roleId: number, @Param('userId') userId: number, @Req() request: Request) {    
    const userReq:  User = request.user as unknown as User;

    return this.userRoleService.remove(userReq, roleId, userId);
  }

  @Get(':userId')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  findAllByUser(@Param('userId') userId: number, @Req() request: Request) {    
    const userReq:  User = request.user as unknown as User;
    return this.userRoleService.findAllByUser(userReq, userId);
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.USER)
  findAllMyUser(@Req() request: Request) {    
    const userReq:  User = request.user as unknown as User;
    return this.userRoleService.findAllMyUser(userReq);
  }
}
