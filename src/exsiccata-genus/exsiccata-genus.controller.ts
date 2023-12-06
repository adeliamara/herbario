import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ExsiccataGenusService } from './exsiccata-genus.service';
import { CreateExsiccataGenusDto } from './dto/create-exsiccata-genus.dto';
import { UpdateExsiccataGenusDto } from './dto/update-exsiccata-genus.dto';
import { AuthGuard } from '../setup/guards/auth.guard';
import { RolesGuard } from '../setup/guards/roles.guard';
import { Role } from '../setup/enums/role.enum';
import { Roles } from '../setup/decorators/roles.decorator';

@Controller('exsiccata-genus')
export class ExsiccataGenusController {
  constructor(private readonly exsiccataGenusService: ExsiccataGenusService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.USER)
  create(@Body() createExsiccataGenuDto: CreateExsiccataGenusDto) {
    return this.exsiccataGenusService.create(createExsiccataGenuDto);
  }

  @Get()
  findAll() {
    return this.exsiccataGenusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.exsiccataGenusService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.USER)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateExsiccataGenuDto: UpdateExsiccataGenusDto) {
    return this.exsiccataGenusService.update(+id, updateExsiccataGenuDto);
  }

  // @Delete(':id')
  // @UseGuards(AuthGuard, RolesGuard)
  // @Roles(Role.USER)
  // remove(@Param('id', ParseIntPipe) id: number) {
  //   return this.exsiccataGenusService.remove(+id);
  // }
}
