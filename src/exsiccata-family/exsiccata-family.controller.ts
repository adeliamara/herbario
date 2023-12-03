import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ExsiccataFamilyService } from './exsiccata-family.service';
import { CreateExsiccataFamilyDto } from './dto/create-exsiccata-family.dto';
import { UpdateExsiccataFamilyDto } from './dto/update-exsiccata-family.dto';
import { AuthGuard } from '../setup/guards/auth.guard';
import { RolesGuard } from '../setup/guards/roles.guard';
import { Roles } from '../setup/decorators/roles.decorator';
import { Role } from '../setup/enums/role.enum';

@Controller('exsiccata-family')
export class ExsiccataFamilyController {
  constructor(private readonly exsiccataFamilyService: ExsiccataFamilyService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.USER)
  create(@Body() createExsiccataFamilyDto: CreateExsiccataFamilyDto) {
    return this.exsiccataFamilyService.create(createExsiccataFamilyDto);
  }

  @Get()
  findAll() {
    return this.exsiccataFamilyService.findAll();
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.USER)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateExsiccataFamilyDto: UpdateExsiccataFamilyDto) {
    return this.exsiccataFamilyService.update(+id, updateExsiccataFamilyDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.USER)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.exsiccataFamilyService.remove(+id);
  }
}
