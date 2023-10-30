import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { GenusService } from './genus.service';
import { CreateGenusDto } from './dto/create-genus.dto';
import { UpdateGenusDto } from './dto/update-genus.dto';

@Controller('genus')
export class GenusController {
  constructor(private readonly genusService: GenusService) {}

  @Post()
  create(@Body() createGenusDto: CreateGenusDto) {
    return this.genusService.create(createGenusDto);
  }

  @Get()
  findAll() {
    return this.genusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.genusService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateGenusDto: UpdateGenusDto) {
    return this.genusService.update(+id, updateGenusDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.genusService.remove(+id);
  }
}
