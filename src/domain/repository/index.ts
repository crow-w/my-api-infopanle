import exp from 'constants';

export { ACCESS_TOKEN_REPOSITORY } from './token-repository.interface';
export { LOGIN_REPOSITORY } from './login-repository.interface';
export { WXLOGIN_REPOSITORY } from './wxlogin-repository.interface';
export { INFO_REPOSITORY } from './info-repository.interface';
export { CATEGORIES_REPOSITORY } from './categories-repository.interface';
export { BANNER_REPOSITORY } from './banner-repository.interface';
export { USER_REPOSITORY } from './user-repository.interface';

export type { UserRepository } from './user-repository.interface';

export type {
  CategoryResult,
  CategoriesRepository,
} from './categories-repository.interface';
export type { AccessTokenRepository } from './token-repository.interface';
export type { LoginRepository } from './login-repository.interface';
export type { WxloginRepository } from './wxlogin-repository.interface';
export type { InfoRepository, InfoResult } from './info-repository.interface';
export type { BannerRepository } from './banner-repository.interface';

export { TANTOUSHA_REPOSITORY } from './tantousha-repository.interface';

export {
  TantoushaRepository,
  TantoushaResult,
} from './tantousha-repository.interface';

export { SHOKUSHU_CATEGORY_REPOSITORY } from './shokushu-category-repository.interface';

export {
  ShokushuCategoryRepository,
  ShokushuCategoryParams,
  ShokushuCategoryResult,
} from './shokushu-category-repository.interface';
