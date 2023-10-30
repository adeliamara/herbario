import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ExsiccataFamilyService } from './exsiccata-family.service';
import { CreateExsiccataFamilyDto } from './dto/create-exsiccata-family.dto';
import { UpdateExsiccataFamilyDto } from './dto/update-exsiccata-family.dto';

@Controller('exsiccata-family')
export class ExsiccataFamilyController {
  constructor(private readonly exsiccataFamilyService: ExsiccataFamilyService) {}

  @Post()
  create(@Body() createExsiccataFamilyDto: CreateExsiccataFamilyDto) {
    return this.exsiccataFamilyService.create(createExsiccataFamilyDto);
  }

  @Get()
  findAll() {
    return this.exsiccataFamilyService.findAll();
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateExsiccataFamilyDto: UpdateExsiccataFamilyDto) {
    return this.exsiccataFamilyService.update(+id, updateExsiccataFamilyDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.exsiccataFamilyService.remove(+id);
  }
}
