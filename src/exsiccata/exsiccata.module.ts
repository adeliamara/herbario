import { Module } from '@nestjs/common';
import { ExsiccataService } from './exsiccata.service';
import { ExsiccataController } from './exsiccata.controller';
import { FamiliesService } from 'src/families/families.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exsiccata } from './entities/exsiccata.entity';
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

@Module({
  imports: [TypeOrmModule.forFeature([Exsiccata,Family, Species, Genus, Botanist, Location, Environment])],
  controllers: [ExsiccataController],
  providers: [ExsiccataService,FamiliesService, GenusService, BotanistsService, LocationsService, SpeciesService, EnvironmentsService],
  exports: [ExsiccataService]
})
export class ExsiccataModule {}
