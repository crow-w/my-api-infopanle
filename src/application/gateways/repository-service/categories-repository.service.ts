import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CategoriesRepository, CategoryResult } from 'src/domain/repository';
import { getManager } from 'typeorm';
import { InfoEntity } from 'src/domain/entities';
import { CreateCategoryDto } from 'src/application/modules/categories/dto/create-category.dto';
import { UuidService } from 'src/util/uuid';
import { DeleteInfoDto } from 'src/application/modules/info/dto/delete-info.dto';
import { UpdateCategoryDto } from 'src/application/modules/categories/dto/update-category.dto';
import { DbClientService } from 'src/infrastructure';
import { Category } from './entities/category.entity';
import { CategoryResultEntity } from 'src/application/modules/categories/entities/category-no.entity';
import { DeleteCategoryDto } from 'src/application/modules/categories/dto/delete-category.dto';
import { CategoryEntity } from 'src/application/modules/categories/entities/category.entity';

@Injectable()
export class CategoriesRepositoryService implements CategoriesRepository {
  constructor(private readonly _dbClient: DbClientService) {}

  findOne(id: number): Promise<CategoryResult> {
    throw new Error('Method not implemented.');
  }

  async findAll(): Promise<any> {
    const baseQuery = 'SELECT * FROM categories WHERE status > 0';

    const res = await this._dbClient.namedSelect(baseQuery).catch((err) => {
      throw new InternalServerErrorException(err);
    });
    return res.data.map(
      (categories) =>
        new CategoryEntity({
          id: categories.id,
          name: categories.name,
          identifier: categories.identifier,
          description: categories.description,
          parentId: categories.parentId,
          createdAt: categories.created_at,
          updatedAt: categories.updated_at,
        }),
    );
  }

  async handleCreate(req: CreateCategoryDto): Promise<CategoryResultEntity> {
    const id = UuidService.getUuid();
    console.log('??');
    await getManager().transaction(async (transactionalEntityManager) => {
      const categoryObj = { id: id, stauts: 1 };
      await transactionalEntityManager
        .insert(Category, Object.assign(req, categoryObj))
        .catch((err) => {
          throw new InternalServerErrorException(err);
        });
    });
    return {
      categoryNo: id,
      // 已创建
      categoryStatus: 1,
    };
  }

  async handleDelete(req: DeleteCategoryDto): Promise<CategoryResultEntity> {
    await getManager().transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager
        .query(`UPDATE categories SET status = 0 WHERE id = '${req.id}'`)
        .catch((err) => {
          throw err;
        });
    });

    return {
      categoryNo: req.id,
      // 已删除
      categoryStatus: 0,
    };
  }

  async handleUpdate(req: UpdateCategoryDto): Promise<CategoryResultEntity> {
    await getManager().transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager
        .update(Category, req.id, req)
        .catch((err) => {
          throw err;
        });
    });
    return {
      categoryNo: req.id,
      // 已删除
      categoryStatus: req.status,
    };
  }
}
