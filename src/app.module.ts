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
import { APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from './setup/pipes/validation.pipe';
import { ErrorMiddleware } from './setup/midleware/logger.midleware';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { RolesGuard } from './setup/guards/roles.guard';
import { RoleModule } from './role/role.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), ConfigModule.forRoot( {envFilePath: '.env'}), TypeOrmModule.forRoot(config), FamiliesModule, SpeciesModule, GenusModule, EnvironmentsModule, BotanistsModule, LocationsModule, ExsiccataModule, ExsiccataFamilyModule, ExsiccataSpeciesModule, ExsiccataGenusModule, AuthModule, UsersModule, RoleModule],
  controllers: [AppController],
  providers: [AppService,    {
    provide: APP_PIPE,
    useClass: ValidationPipe,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: ErrorMiddleware,
  },

],
})
export class AppModule {}
