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
import { Collector } from 'src/collectors/entities/collector.entity';
import { CollectorsService } from 'src/collectors/collectors.service';
import { LocationsService } from 'src/locations/locations.service';
import { Location } from 'src/locations/entities/location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Exsiccata,Family, Species, Genus, Collector, Location])],
  controllers: [ExsiccataController],
  providers: [ExsiccataService,FamiliesService, GenusService, CollectorsService, LocationsService],
  exports: [ExsiccataService]
})
export class ExsiccataModule {}
