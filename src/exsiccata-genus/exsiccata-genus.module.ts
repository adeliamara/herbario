import { Module } from '@nestjs/common';
import { ExsiccataGenusService } from './exsiccata-genus.service';
import { ExsiccataGenusController } from './exsiccata-genus.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExsiccataGenus } from './entities/exsiccata-genus.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExsiccataGenus])],
  controllers: [ExsiccataGenusController],
  providers: [ExsiccataGenusService]
})
export class ExsiccataGenusModule {}
