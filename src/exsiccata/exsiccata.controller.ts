import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExsiccataService } from './exsiccata.service';
import { CreateExsiccataDto } from './dto/create-exsiccata.dto';
import { UpdateExsiccataDto } from './dto/update-exsiccata.dto';

@Controller('exsiccata')
export class ExsiccataController {
  constructor(private readonly exsiccataService: ExsiccataService) {}

  @Post()
  create(@Body() createExsiccataDto: CreateExsiccataDto) {
    return this.exsiccataService.create(createExsiccataDto);
  }

  @Get()
  findAll() {
    return this.exsiccataService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exsiccataService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExsiccataDto: UpdateExsiccataDto) {
    return this.exsiccataService.update(+id, updateExsiccataDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exsiccataService.remove(+id);
  }
}
