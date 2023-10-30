import { Module } from '@nestjs/common';
import { BotanistsController } from './botanists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BotanistsService } from './botanists.service';
import { Botanist } from './entities/botanist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Botanist])],
  controllers: [BotanistsController],
  providers: [BotanistsService]
})
export class BotanistsModule {}
