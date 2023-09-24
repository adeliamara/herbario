import { Module } from '@nestjs/common';
import { ExsiccataService } from './exsiccata.service';
import { ExsiccataController } from './exsiccata.controller';
import { ExsiccataFamily } from 'src/exsiccata-family/entities/exsiccata-family.entity';
import { FamiliesService } from 'src/families/families.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exsiccata } from './entities/exsiccata.entity';
import { Family } from 'src/families/entities/family.entity';
import { ExsiccataFamilyService } from 'src/exsiccata-family/exsiccata-family.service';
import { Species } from 'src/species/entities/species.entity';
import { ExsiccataSpeciesService } from 'src/exsiccata-species/exsiccata-species.service';
import { SpeciesService } from 'src/species/species.service';

@Module({
  imports: [TypeOrmModule.forFeature([Exsiccata,ExsiccataFamily,Family, Species])],
  controllers: [ExsiccataController],
  providers: [ExsiccataService,FamiliesService, ExsiccataFamilyService, ExsiccataSpeciesService, SpeciesService]
})
export class ExsiccataModule {}
