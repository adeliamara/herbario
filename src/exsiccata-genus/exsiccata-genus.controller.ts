import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExsiccataGenusService } from './exsiccata-genus.service';
import { CreateExsiccataGenusDto } from './dto/create-exsiccata-genus.dto';
import { UpdateExsiccataGenusDto } from './dto/update-exsiccata-genus.dto';

@Controller('exsiccata-genus')
export class ExsiccataGenusController {
  constructor(private readonly exsiccataGenusService: ExsiccataGenusService) {}

  @Post()
  create(@Body() createExsiccataGenuDto: CreateExsiccataGenusDto) {
    return this.exsiccataGenusService.create(createExsiccataGenuDto);
  }

  @Get()
  findAll() {
    return this.exsiccataGenusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exsiccataGenusService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExsiccataGenuDto: UpdateExsiccataGenusDto) {
    return this.exsiccataGenusService.update(+id, updateExsiccataGenuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exsiccataGenusService.remove(+id);
  }
}
