import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FamiliesModule } from './families/families.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './ormconfig'; 
import { SpeciesModule } from './species/species.module';
import { GenusModule } from './genus/genus.module';
import { EnvironmentsModule } from './environments/environments.module';
import { CollectorsModule } from './collectors/collectors.module';
import { LocationsModule } from './locations/locations.module';
import { ExsiccataModule } from './exsiccata/exsiccata.module';
import { ExsiccataFamilyModule } from './exsiccata-family/exsiccata-family.module';

@Module({
  imports: [ TypeOrmModule.forRoot(config), FamiliesModule, SpeciesModule, GenusModule, EnvironmentsModule, CollectorsModule, LocationsModule, ExsiccataModule, ExsiccataFamilyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
