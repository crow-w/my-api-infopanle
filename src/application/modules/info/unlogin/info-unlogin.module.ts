import { Module } from '@nestjs/common';
import { InfoUnloginController } from './info-unlogin.controller';
import { InfoUnloginService } from './info-unlogin.service';
import { INFO_REPOSITORY } from 'src/domain/repository';
import { InfoRepositoryService } from 'src/application/gateways/repository-service/info-repository.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Info } from 'src/application/gateways/repository-service/entities';
import { DbClientModule } from 'src/infrastructure';

@Module({
  controllers: [InfoUnloginController],
  providers: [
    InfoUnloginService,
    {
      provide: INFO_REPOSITORY,
      useClass: InfoRepositoryService,
    },
  ],
  imports: [DbClientModule, TypeOrmModule.forFeature([Info])],
})
export class InfoUnloginModule {}
