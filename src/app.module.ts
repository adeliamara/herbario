import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FamiliesModule } from './families/families.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './ormconfig'; 
import { SpeciesModule } from './species/species.module';
import { GenusModule } from './genus/genus.module';
import { EnvironmentsModule } from './environments/environments.module';
import { LocationsModule } from './locations/locations.module';
import { ExsiccataModule } from './exsiccata/exsiccata.module';
import { ExsiccataFamilyModule } from './exsiccata-family/exsiccata-family.module';
import { ExsiccataSpeciesModule } from './exsiccata-species/exsiccata-species.module';
import { ExsiccataGenusModule } from './exsiccata-genus/exsiccata-genus.module';
import { BotanistsModule } from './botanists/botanists.module';

@Module({
  imports: [ TypeOrmModule.forRoot(config), FamiliesModule, SpeciesModule, GenusModule, EnvironmentsModule, BotanistsModule, LocationsModule, ExsiccataModule, ExsiccataFamilyModule, ExsiccataSpeciesModule, ExsiccataGenusModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
