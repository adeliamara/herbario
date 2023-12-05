import { Module } from '@nestjs/common';
import { FamiliesService } from 'src/families/families.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Family } from 'src/families/entities/family.entity';
import { Genus } from 'src/genus/entities/genus.entity';
import { Species } from 'src/species/entities/species.entity';
import { SpeciesService } from 'src/species/species.service';
import { GenusService } from 'src/genus/genus.service';
import { LocationsService } from 'src/locations/locations.service';
import { Location } from 'src/locations/entities/location.entity';
import { EnvironmentsService } from 'src/environments/environments.service';
import { Environment } from 'src/environments/entities/environment.entity';
import { BotanistsService } from 'src/botanists/botanists.service';
import { Botanist } from 'src/botanists/entities/botanist.entity';
import { PrintsService } from './prints.service';
import { PrintsController } from './prints.controller';
import { Exsiccata } from '../exsiccata/entities/exsiccata.entity';
import { ExsiccataService } from '../exsiccata/exsiccata.service';
import { Print } from './entities/print.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Print, Exsiccata, Family, Species, Genus, Botanist, Location, Environment])],
  controllers: [PrintsController],
  providers: [PrintsService, ExsiccataService,FamiliesService, GenusService, BotanistsService, LocationsService, SpeciesService, EnvironmentsService],
  exports: [PrintsService],
})
export class PrintsModule {}
