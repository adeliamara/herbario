import { Module } from '@nestjs/common';
import { ExsiccataSpeciesService } from './exsiccata-species.service';
import { ExsiccataSpeciesController } from './exsiccata-species.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExsiccataSpecies } from './entities/exsiccata-species.enticie';

@Module({
  imports: [TypeOrmModule.forFeature([ExsiccataSpecies])],
  controllers: [ExsiccataSpeciesController],
  providers: [ExsiccataSpeciesService]
})
export class ExsiccataSpeciesModule {}
