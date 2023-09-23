import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FamiliesModule } from './families/families.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './ormconfig'; 

@Module({
  imports: [ TypeOrmModule.forRoot(config), FamiliesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
