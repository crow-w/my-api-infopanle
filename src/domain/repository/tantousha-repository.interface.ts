export const TANTOUSHA_REPOSITORY = 'tantousha_repository';

export interface TantoushaRepository {
  findAll(): Promise<TantoushaResult[]>;
}

export type TantoushaResult = {
  cd: string;
  name: string;
};
