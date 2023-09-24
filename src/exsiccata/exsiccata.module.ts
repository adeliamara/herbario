import { Module } from '@nestjs/common';
import { ExsiccataService } from './exsiccata.service';
import { ExsiccataController } from './exsiccata.controller';
import { ExsiccataFamily } from 'src/exsiccata-family/entities/exsiccata-family.entity';
import { FamiliesService } from 'src/families/families.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exsiccata } from './entities/exsiccata.entity';
import { Family } from 'src/families/entities/family.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Exsiccata,ExsiccataFamily,Family])],
  controllers: [ExsiccataController],
  providers: [ExsiccataService,FamiliesService],
})
export class ExsiccataModule {}
