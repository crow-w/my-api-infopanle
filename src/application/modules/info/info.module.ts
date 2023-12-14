import { Module } from '@nestjs/common';
import { InfoController } from './info.controller';
import { InfoService } from './info.service';
import { INFO_REPOSITORY } from 'src/domain/repository';
import { InfoRepositoryService } from 'src/application/gateways/repository-service/info-repository.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Info } from 'src/application/gateways/repository-service/entities';
import { DbClientModule } from 'src/infrastructure';

@Module({
  controllers: [InfoController],
  providers: [
    InfoService,
    {
      provide: INFO_REPOSITORY,
      useClass: InfoRepositoryService,
    },
  ],
  imports: [DbClientModule, TypeOrmModule.forFeature([Info])],
})
export class InfoModule {}
