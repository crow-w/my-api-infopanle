import { LoginEntity } from '../entities';

export const LOGIN_REPOSITORY = 'login_repository';

export interface LoginRepository {
  login(authorizationCode: string): Promise<LoginEntity>;
}
