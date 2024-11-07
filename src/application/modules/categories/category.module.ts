import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CATEGORIES_REPOSITORY } from 'src/domain/repository/categories-repository.interface';
import { Category } from 'src/application/gateways/repository-service/entities/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbClientModule } from 'src/infrastructure';
import { CategoriesRepositoryService } from 'src/application/gateways/repository-service/categories-repository.service';

@Module({
  controllers: [CategoryController],
  providers: [
    CategoryService,
    {
      provide: CATEGORIES_REPOSITORY,
      useClass: CategoriesRepositoryService,
    },
  ],
  imports: [DbClientModule, TypeOrmModule.forFeature([Category])],
})
export class CategoryModule {}
