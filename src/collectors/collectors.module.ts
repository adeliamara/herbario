import { Module } from '@nestjs/common';
import { CollectorsService } from './collectors.service';
import { CollectorsController } from './collectors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collector } from './entities/collector.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Collector])],
  controllers: [CollectorsController],
  providers: [CollectorsService]
})
export class CollectorsModule {}
