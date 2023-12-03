import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, ParseIntPipe, UseGuards } from '@nestjs/common';
import { FamiliesService } from './families.service';
import { CreateFamilyDto } from './dto/create-family.dto';
import { UpdateFamilyDto } from './dto/update-family.dto';
import { AuthGuard } from '../setup/guards/auth.guard';
import { RolesGuard } from '../setup/guards/roles.guard';
import { Role } from '../setup/enums/role.enum';
import { Roles } from '../setup/decorators/roles.decorator';

@Controller('families')
export class FamiliesController {
  constructor(private readonly familiesService: FamiliesService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.USER)
  create(@Body() createFamilyDto: CreateFamilyDto) {
    return this.familiesService.create(createFamilyDto);
  }

  @Get()
  findAll() {
    return this.familiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.familiesService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.USER)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateFamilyDto: UpdateFamilyDto) {
    return this.familiesService.update(+id, updateFamilyDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.USER)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.familiesService.remove(+id);
  }
}
