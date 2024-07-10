import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CandidatesModule } from './candidates/candidates.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../db/data-source';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), CandidatesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
