import { UseGuards, Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { PrintsService } from './prints.service';
import { CreatePrintDto } from './dto/create-print.dto';
import { UpdatePrintDto } from './dto/update-print.dto';
import { AuthGuard } from '../setup/guards/auth.guard';
import { RolesGuard } from '../setup/guards/roles.guard';
import { Role } from '../setup/enums/role.enum';
import { Roles } from '../setup/decorators/roles.decorator';
import { User } from '../users/entities/user.entity';
import { Request } from 'express';
import { Print } from './entities/print.entity';
import { Exsiccata } from '../exsiccata/entities/exsiccata.entity';

@Controller('prints')
export class PrintsController {
  constructor(private readonly printsService: PrintsService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.USER)
  async create(@Body() createPrintDto: CreatePrintDto, @Req() request: Request): Promise<Print> {
    const userReq: User = request.user as unknown as User;
    return this.printsService.create(userReq, createPrintDto);
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.USER)
  findAllMyUser(@Req() request: Request): Promise<Exsiccata[]>  {
    const userReq: User = request.user as unknown as User;
    return this.printsService.findAllExsicatasForPrintByUser(userReq);
  }
  
  @Get(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.USER)
  findOne(@Param('id') id: string,@Req() request: Request): Promise<Exsiccata[]>  {
    const userReq: User = request.user as unknown as User;

    return this.printsService.findOneRegister(userReq.id, +id);
  }
  
  @Delete()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.USER)
  clearAllListForPrint(@Req() request: Request) {
    const userReq: User = request.user as unknown as User;

    return this.printsService.clearAllListForPrint(userReq);
  }

  @Delete(':exsicataId')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.USER)
  remove(@Param('exsicataId') exsicataId: string, @Req() request: Request) {
    const userReq: User = request.user as unknown as User;

    return this.printsService.remove(userReq, +exsicataId);
  }
}
