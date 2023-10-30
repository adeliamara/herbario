import { Controller, Get, Post, Body, Patch, Param, Delete, ParseArrayPipe, ParseIntPipe } from '@nestjs/common';
import { ExsiccataSpeciesService } from './exsiccata-species.service';
import { CreateExsiccataSpeciesDto } from './dto/create-exsiccata-species.dto';
import { UpdateExsiccataSpeciesDto } from './dto/update-exsiccata-species.dto';

@Controller('exsiccata-species')
export class ExsiccataSpeciesController {
  constructor(private readonly exsiccataSpeciesService: ExsiccataSpeciesService) {}

  @Post()
  create(@Body() createExsiccataSpecyDto: CreateExsiccataSpeciesDto) {
    return this.exsiccataSpeciesService.create(createExsiccataSpecyDto);
  }

  @Get()
  findAll() {
    return this.exsiccataSpeciesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.exsiccataSpeciesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateExsiccataSpecyDto: UpdateExsiccataSpeciesDto) {
    return this.exsiccataSpeciesService.update(+id, updateExsiccataSpecyDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.exsiccataSpeciesService.remove(+id);
  }
}
