import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { BotanistsService } from './botanists.service';
import { CreateBotanistDto } from './dto/create-botanist.dto';
import { UpdateBotanistDto } from './dto/update-botanist.dto';
import { AuthGuard } from '../setup/guards/auth.guard';
import { Roles } from '../setup/decorators/roles.decorator';
import { Role } from '../setup/enums/role.enum';
import { RolesGuard } from '../setup/guards/roles.guard';

@Controller('botanists')
export class BotanistsController {
  constructor(private readonly botanistsService: BotanistsService) { }

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.USER)
  create(@Body() createBotanistDto: CreateBotanistDto) {
    return this.botanistsService.create(createBotanistDto);
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.USER)
  findAll() {
    return this.botanistsService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.USER)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.botanistsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.USER)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateBotanistDto: UpdateBotanistDto) {
    return this.botanistsService.update(+id, updateBotanistDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.USER)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.botanistsService.remove(+id);
  }

  @Post(':id/restore') 
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.USER)
  restore(@Param('id') id: string) {
    return this.botanistsService.restore(+id);
  }
}
