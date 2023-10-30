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
  constructor(private readonly exsiccataService: ExsiccataService) { }

  @Post()
  create(@Body() createExsiccataDto: CreateExsiccataDto) {
    return this.exsiccataService.create(createExsiccataDto);
  }


  @Get()
  findAll(
    @Query('genus') genusName?: string,
    @Query('species') speciesName?: string,
    @Query('family') familyName?: string,
    @Query('color') color?: string,
    @Query('growthHabit') growthHabit?: string,
    @Query('scientificName') scientificName?: string,
    @Query('commonName') commonName?: string,
    @Query('collectionDateStart') collectionDateStart?: string,
    @Query('collector') collectorName?: string,
    @Query('determinator') determinatorName?: string,
    @Query('environment') environmentName?: string,
    @Query('collectionDateEnd') collectionDateEnd?: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number = 20,
  ): Promise<Pagination<Exsiccata>> {
    limit = Math.min(20, limit);

    const options: IPaginationOptions = {
      page,
      limit,
      route: 'exsiccata',
    };

    const filterOptions = {
      genusName,
      speciesName,
      familyName,
      color,
      growthHabit,
      scientificName,
      commonName,
      collectionDateStart: collectionDateStart ? new Date(collectionDateStart) : undefined,
      collectionDateEnd: collectionDateEnd ? new Date(collectionDateEnd) : undefined,
      collectorName,
      determinatorName,
      environmentName
    };

    return this.exsiccataService.findAllPaginateWithFilter(filterOptions,options);

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
