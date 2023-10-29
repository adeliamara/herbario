import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BotanistsService } from './botanists.service';
import { CreateBotanistDto } from './dto/create-botanist.dto';
import { UpdateBotanistDto } from './dto/update-botanist.dto';

@Controller('botanists')
export class BotanistsController {
  constructor(private readonly botanistsService: BotanistsService) {}

  @Post()
  create(@Body() createBotanistDto: CreateBotanistDto) {
    return this.botanistsService.create(createBotanistDto);
  }

  @Get()
  findAll() {
    return this.botanistsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.botanistsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBotanistDto: UpdateBotanistDto) {
    return this.botanistsService.update(+id, updateBotanistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.botanistsService.remove(+id);
  }
}
