import { Module } from '@nestjs/common';
import { ExsiccataFamilyService } from './exsiccata-family.service';
import { ExsiccataFamilyController } from './exsiccata-family.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExsiccataFamily } from './entities/exsiccata-family.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExsiccataFamily])],
  controllers: [ExsiccataFamilyController],
  providers: [ExsiccataFamilyService]
})
export class ExsiccataFamilyModule {}
