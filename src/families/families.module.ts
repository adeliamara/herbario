import { Module } from '@nestjs/common';
import { FamiliesService } from './families.service';
import { FamiliesController } from './families.controller';
import { Family } from './entities/family.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exsiccata } from 'src/exsiccata/entities/exsiccata.entity';
import { ExsiccataFamily } from 'src/exsiccata-family/entities/exsiccata-family.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Family])],
  controllers: [FamiliesController],
  providers: [FamiliesService]
})
export class FamiliesModule {}
