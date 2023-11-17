import { Module } from '@nestjs/common';
import { ExsiccataService } from './exsiccata.service';
import { ExsiccataController } from './exsiccata.controller';
import { Exsiccata } from './entities/exsiccata.entity';
import { Family } from '../families/entities/family.entity';
import { Species } from '../species/entities/species.entity';
import { Genus } from '../genus/entities/genus.entity';
import { Botanist } from '../botanists/entities/botanist.entity';
import { Environment } from '../environments/entities/environment.entity';
import { FamiliesService } from '../families/families.service';
import { GenusService } from '../genus/genus.service';
import { BotanistsService } from '../botanists/botanists.service';
import { LocationsService } from '../locations/locations.service';
import { SpeciesService } from '../species/species.service';
import { EnvironmentsService } from '../environments/environments.service';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([Exsiccata,Family, Species, Genus, Botanist, Location, Environment])],
  controllers: [ExsiccataController],
  providers: [ExsiccataService,FamiliesService, GenusService, BotanistsService, LocationsService, SpeciesService, EnvironmentsService],
  exports: [ExsiccataService]
})
export class ExsiccataModule {}


