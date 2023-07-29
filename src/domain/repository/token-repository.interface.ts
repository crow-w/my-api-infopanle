export const ACCESS_TOKEN_REPOSITORY = 'access_token_repository';

export interface AccessTokenRepository {
  save(userCd: string, token: string): Promise<void>;
  get(key: string): Promise<string | null>;
}
