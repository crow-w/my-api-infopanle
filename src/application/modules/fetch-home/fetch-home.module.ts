import { Module } from '@nestjs/common';
import { FetchHomeService } from './fetch-home.service';
import { FetchHomeController } from './fetch-home.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Category,
  Info,
} from 'src/application/gateways/repository-service/entities';
import { CategoryService } from '../categories/category.service';
import { InfoRepositoryService } from 'src/application/gateways/repository-service/info-repository.service';
import {
  BANNER_REPOSITORY,
  CATEGORIES_REPOSITORY,
  INFO_REPOSITORY,
} from 'src/domain/repository';
import { InfoService } from '../info/info.service';
import { CategoriesRepositoryService } from 'src/application/gateways/repository-service/categories-repository.service';
import { DbClientModule } from 'src/infrastructure';
import { BannerService } from '../banner/banner.service';
import { BannerRepositoryService } from 'src/application/gateways/repository-service/banner-repository.service';

@Module({
  controllers: [FetchHomeController],
  providers: [
    CategoryService,
    BannerService,
    {
      provide: CATEGORIES_REPOSITORY,
      useClass: CategoriesRepositoryService,
    },
    {
      provide: BANNER_REPOSITORY,
      useClass: BannerRepositoryService,
    },
  ],
  imports: [DbClientModule, TypeOrmModule.forFeature([Category])],
})
export class FetchHomeModule {}
