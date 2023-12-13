import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';

import { LoginRepository } from 'src/domain/repository/login-repository.interface';
import { LoginDto } from 'src/application/modules/login/dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities';
import { LoginEntity } from 'src/domain/entities';

@Injectable()
export class LoginRepositoryService implements LoginRepository {
  constructor(
    @InjectRepository(User)
    private readonly _userRepository: Repository<User>,
  ) {}

  async login(body: LoginDto): Promise<LoginEntity> {
    let user = undefined;
    user = await this._userRepository.findOne(body).catch((err) => {
      throw err;
    });
    if (!user) {
      throw new BadRequestException('账号或密码错误');
    }
    return new LoginEntity({
      username: user.username,
      password: user.password,
      email: user.email,
      id: user.id,
    });
  }
}
