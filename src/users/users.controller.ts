import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, ForbiddenException, UseInterceptors, ClassSerializerInterceptor, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { RolesGuard } from '../setup/guards/roles.guard';
import { AuthGuard } from '../setup/guards/auth.guard';
import { Roles } from '../setup/decorators/roles.decorator';
import { Role } from '../setup/enums/role.enum';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<Partial<CreateUserDto>> {
    const user: User = await this.usersService.create(createUserDto);
    const safeResponse: Partial<CreateUserDto> = {
      id: user.id,
    };
    return safeResponse;
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async findAll() {
    const users: User[] = await this.usersService.findAll();

    const safeResponse = users.map(user => ({
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      birthDate: user.birthDate,
      roles: user.roles
    }));

    return safeResponse;
  }

  @Get('soft-deleted')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async getSoftDeleted() {
    const softDeletedUser = await this.usersService.getSoftDeleted();
    return softDeletedUser;
  }

  @Get('count')
  count(){
    return this.usersService.count();
  }

  @Get(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async findOne(@Param('id') id: string, @Req() request: Request) {

    const userReq: User = request.user as unknown as User;

    if (this.userIdIsDifferent(userReq, +id) && this.UserIsNotAdmin()) {
      throw new ForbiddenException();
    }

    const user: User = await this.usersService.findOne(userReq, +id);

    const safeResponse: any = {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      birthDate: user.birthDate,
      roles: user.roles
    };

    return safeResponse;
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.USER)
  remove(@Param('id', ParseIntPipe) id: number, @Req() request: Request) {
    const userReq: User = request.user as unknown as User;

    return this.usersService.remove(userReq, +id);
  }


  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  private UserIsNotAdmin(): boolean {
    return true;
  }

  private userIdIsDifferent(user: User, id: number): boolean {
    return user.id === id;
  }
  
}
