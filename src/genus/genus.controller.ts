import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards} from '@nestjs/common';
import { GenusService } from './genus.service';
import { CreateGenusDto } from './dto/create-genus.dto';
import { UpdateGenusDto } from './dto/update-genus.dto';
import { AuthGuard } from '../setup/guards/auth.guard';
import { RolesGuard } from '../setup/guards/roles.guard';
import { Role } from '../setup/enums/role.enum';
import { Roles } from '../setup/decorators/roles.decorator';

@Controller('genus')
export class GenusController {
  constructor(private readonly genusService: GenusService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.USER)
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
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.USER)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateGenusDto: UpdateGenusDto) {
    return this.genusService.update(+id, updateGenusDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.USER)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.genusService.remove(+id);
  }
}
