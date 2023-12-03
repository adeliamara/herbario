import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { EnvironmentsService } from './environments.service';
import { CreateEnvironmentDto } from './dto/create-environment.dto';
import { UpdateEnvironmentDto } from './dto/update-environment.dto';
import { AuthGuard } from '../setup/guards/auth.guard';
import { RolesGuard } from '../setup/guards/roles.guard';
import { Role } from '../setup/enums/role.enum';
import { Roles } from '../setup/decorators/roles.decorator';

@Controller('environments')
export class EnvironmentsController {
  constructor(private readonly environmentsService: EnvironmentsService) { }

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.USER)
  create(@Body() createEnvironmentDto: CreateEnvironmentDto) {
    return this.environmentsService.create(createEnvironmentDto);
  }

  @Get()
  findAll() {
    return this.environmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.environmentsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.USER)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateEnvironmentDto: UpdateEnvironmentDto) {
    return this.environmentsService.update(+id, updateEnvironmentDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.USER)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.environmentsService.remove(+id);
  }
}
