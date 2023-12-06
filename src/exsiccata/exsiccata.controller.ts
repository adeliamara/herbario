import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, DefaultValuePipe, UseGuards, Req } from '@nestjs/common';
import { ExsiccataService } from './exsiccata.service';
import { CreateExsiccataDto } from './dto/create-exsiccata.dto';
import { UpdateExsiccataDto } from './dto/update-exsiccata.dto';
import { Exsiccata } from './entities/exsiccata.entity';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { AuthGuard } from '../setup/guards/auth.guard';
import { RolesGuard } from '../setup/guards/roles.guard';
import { Roles } from '../setup/decorators/roles.decorator';
import { Role } from '../setup/enums/role.enum';
import { User } from '../users/entities/user.entity';
import { Request } from 'express';

@Controller('exsiccata')
export class ExsiccataController {
  constructor(private readonly exsiccataService: ExsiccataService) { }

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.USER)
  async create(@Body() createExsiccataDto: CreateExsiccataDto, @Req() request: Request): Promise<Exsiccata> {
    const userReq: User = request.user as User;
    return this.exsiccataService.create(userReq, createExsiccataDto);
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

    return this.exsiccataService.findAllPaginateWithFilter(filterOptions, options);

  }

  @Get('soft-deleted')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async getSoftDeletedExsiccata() {
    const softDeletedExsiccata = await this.exsiccataService.getSoftDeleted();
    return softDeletedExsiccata;
  }
  
  @Get('count')
  count(){
    return this.exsiccataService.count();
  }

  @Get('count/created-per-time-unit')
  countCreatedPerTimeUnit(
    @Query('groupBy') groupBy: 'month' | 'year' | 'day',
    @Query('unitsAgo') unitsAgo: number = 1,
  ) {
    return this.exsiccataService.countExsiccataCreatedPerTimeUnit(groupBy, unitsAgo);
  }

  @Get('count/deleted-per-time-unit')
  countDeletedPerTimeUnit(
    @Query('groupBy') groupBy: 'month' | 'year' | 'day',
    @Query('unitsAgo') unitsAgo: number = 1,
  ) {
    return this.exsiccataService.countExsiccataDeletedPerTimeUnit(groupBy, unitsAgo);
  }

  @Get('count/states')
  countByStates(){
    return this.exsiccataService.findStatesWithMostExsicatas();
  }

  @Get('count/waiting-determination')
  countWaitingDetermination(){
    return this.exsiccataService.countExsiccataWaitingForDetermination();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.exsiccataService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.USER)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateExsiccataDto: UpdateExsiccataDto) {
    return this.exsiccataService.update(+id, updateExsiccataDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.USER)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.exsiccataService.remove(+id);
  }

  @Post(':id/restore') 
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.USER)
  restore(@Param('id') id: string) {
    return this.exsiccataService.restore(+id);
  }
}
