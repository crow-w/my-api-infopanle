import { LoginDto } from 'src/application/modules/login/dto';
import { LoginEntity } from '../entities';

export const LOGIN_REPOSITORY = 'login_repository';

export interface LoginRepository {
  login(body: LoginDto): Promise<LoginEntity>;
}
