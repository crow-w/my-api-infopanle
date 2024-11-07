import { Module } from '@nestjs/common';
import { BannerService } from './banner.service';
import { BannerController } from './banner.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BannerRepositoryService } from 'src/application/gateways/repository-service/banner-repository.service';
import { Info } from 'src/application/gateways/repository-service/entities';
import { BANNER_REPOSITORY } from 'src/domain/repository';
import { DbClientModule } from 'src/infrastructure';

@Module({
  controllers: [BannerController],
  providers: [
    BannerService,
    {
      provide: BANNER_REPOSITORY,
      useClass: BannerRepositoryService,
    },
  ],
  imports: [DbClientModule, TypeOrmModule.forFeature([Info])],
})
export class BannerModule {}
