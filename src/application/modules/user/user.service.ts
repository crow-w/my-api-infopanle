import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { USER_REPOSITORY, UserRepository } from 'src/domain/repository';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly _userRepository: UserRepository,
  ) {}

  async findOne(): Promise<UserEntity> {
    return await this._userRepository.findOne().catch((err) => {
      throw err;
    });
  }
}
