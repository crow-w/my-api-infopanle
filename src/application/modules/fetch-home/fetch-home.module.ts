import { Module } from '@nestjs/common';
import { FetchHomeService } from './fetch-home.service';
import { FetchHomeController } from './fetch-home.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Info } from 'src/application/gateways/repository-service/entities';

@Module({
  controllers: [FetchHomeController],
  providers: [FetchHomeService],
  imports: [TypeOrmModule.forFeature([Info])],
})
export class FetchHomeModule {}
