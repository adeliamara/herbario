import { Module } from '@nestjs/common';
import { GenusService } from './genus.service';
import { GenusController } from './genus.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genus } from './entities/genus.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Genus])],
  controllers: [GenusController],
  providers: [GenusService]
})
export class GenusModule {}
