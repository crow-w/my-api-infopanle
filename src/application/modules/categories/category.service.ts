import { Inject, Injectable } from '@nestjs/common';
import { CategoryEntities, CategoryEntity } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {
  CATEGORIES_REPOSITORY,
  CategoriesRepository,
} from 'src/domain/repository/categories-repository.interface';
import { CategoryResultEntity } from './entities/category-no.entity';
import { DeleteCategoryDto } from './dto/delete-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(CATEGORIES_REPOSITORY)
    private readonly _categoryRepository: CategoriesRepository,
  ) {}

  async findAll(): Promise<CategoryEntities> {
    const res = await this._categoryRepository.findAll().catch((err) => {
      throw err;
    });
    const categories = res.map(
      (data) =>
        new CategoryEntity({
          id: data.id,
          name: data.name,
          identifier: data.identifier,
          description: data.description,
          parentId: data.parentId,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        }),
    );

    return {
      categoryList: categories,
    };
  }

  async handleCreate(req: CreateCategoryDto): Promise<CategoryResultEntity> {
    const res = await this._categoryRepository
      .handleCreate(req)
      .catch((err) => {
        throw err;
      });
    return {
      categoryNo: res.categoryNo,
      categoryStatus: res.categoryStatus,
    };
  }

  async handleUpdate(req: UpdateCategoryDto): Promise<CategoryResultEntity> {
    const res = await this._categoryRepository
      .handleUpdate(req)
      .catch((err) => {
        throw err;
      });
    return {
      categoryNo: res.categoryNo,
      categoryStatus: res.categoryStatus,
    };
  }

  async handleDelete(req: DeleteCategoryDto): Promise<CategoryResultEntity> {
    const res = await this._categoryRepository
      .handleDelete(req)
      .catch((err) => {
        throw err;
      });
    return {
      categoryNo: res.categoryNo,
      categoryStatus: res.categoryStatus,
    };
  }
}
