import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, DefaultValuePipe } from '@nestjs/common';
import { ExsiccataService } from './exsiccata.service';
import { CreateExsiccataDto } from './dto/create-exsiccata.dto';
import { UpdateExsiccataDto } from './dto/update-exsiccata.dto';
import { Exsiccata } from './entities/exsiccata.entity';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Controller('exsiccata')
export class ExsiccataController {
  constructor(private readonly exsiccataService: ExsiccataService) {}

  @Post()
  create(@Body() createExsiccataDto: CreateExsiccataDto) {
    return this.exsiccataService.create(createExsiccataDto);
  }

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number = 20,
  ): Promise<Pagination<Exsiccata>> {
    limit = Math.min(20, limit);

    const options: IPaginationOptions = {
      page,
      limit,
      route: 'exsiccata',
    };

    return this.exsiccataService.findAllPaginate(options);

  }


  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
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
