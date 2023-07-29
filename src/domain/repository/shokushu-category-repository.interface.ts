export const SHOKUSHU_CATEGORY_REPOSITORY = 'shokushu_category_repository';

export interface ShokushuCategoryRepository {
  findByName(params: ShokushuCategoryParams): Promise<ShokushuCategoryResult[]>;
}

export type ShokushuCategoryParams = {
  name: string;
};

export type ShokushuCategoryResult = {
  cd: string;
  name: string;
};
