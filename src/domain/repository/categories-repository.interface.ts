import { CreateCategoryDto } from 'src/application/modules/categories/dto/create-category.dto';
import { DeleteCategoryDto } from 'src/application/modules/categories/dto/delete-category.dto';
import { UpdateCategoryDto } from 'src/application/modules/categories/dto/update-category.dto';
import { CategoryResultEntity } from 'src/application/modules/categories/entities/category-no.entity';

export const CATEGORIES_REPOSITORY = 'categories_repository';

export interface CategoriesRepository {
  handleCreate(req: CreateCategoryDto): Promise<CategoryResultEntity>;
  findAll(): Promise<CategoryResult[]>;
  findOne(id: number): Promise<CategoryResult>;
  handleDelete(req: DeleteCategoryDto): Promise<CategoryResultEntity>;
  handleUpdate(req: UpdateCategoryDto): Promise<CategoryResultEntity>;
}

export type CategoryResult = {
  id: string;
  name: string;
  identifier: number;
  description?: string;
  parentId?: number;
  createdAt: Date;
  updatedAt: Date;
};
