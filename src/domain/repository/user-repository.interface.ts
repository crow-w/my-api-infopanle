import { UserEntity } from 'src/application/modules/user/entities/user.entity';

export const USER_REPOSITORY = 'user_repository';

export interface UserRepository {
  findOne(): Promise<UserEntity>;
}
