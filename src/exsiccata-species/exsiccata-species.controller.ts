import { Controller, Get, Post, Body, Patch, Param, Delete, ParseArrayPipe, ParseIntPipe, UseGuards} from '@nestjs/common';
import { ExsiccataSpeciesService } from './exsiccata-species.service';
import { CreateExsiccataSpeciesDto } from './dto/create-exsiccata-species.dto';
import { UpdateExsiccataSpeciesDto } from './dto/update-exsiccata-species.dto';
import { AuthGuard } from '../setup/guards/auth.guard';
import { RolesGuard } from '../setup/guards/roles.guard';
import { Role } from '../setup/enums/role.enum';
import { Roles } from '../setup/decorators/roles.decorator';

@Controller('exsiccata-species')
export class ExsiccataSpeciesController {
  constructor(private readonly exsiccataSpeciesService: ExsiccataSpeciesService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.USER)
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
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.USER)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateExsiccataSpecyDto: UpdateExsiccataSpeciesDto) {
    return this.exsiccataSpeciesService.update(+id, updateExsiccataSpecyDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.USER)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.exsiccataSpeciesService.remove(+id);
  }
}
