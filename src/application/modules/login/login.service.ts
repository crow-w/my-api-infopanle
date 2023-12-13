import {
  Injectable,
  Inject,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import {
  ACCESS_TOKEN_REPOSITORY,
  LOGIN_REPOSITORY,
} from 'src/domain/repository';
import type {
  AccessTokenRepository,
  LoginRepository,
} from 'src/domain/repository';
import { AuthLoginEntity } from './entities';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto';

@Injectable()
export class LoginService {
  public constructor(
    private _jwtService: JwtService,
    @Inject(LOGIN_REPOSITORY)
    private readonly _loginRepository: LoginRepository,
    @Inject(ACCESS_TOKEN_REPOSITORY)
    private readonly _accessTokenRepository: AccessTokenRepository,
  ) {}

  public async handleLogin(body: LoginDto): Promise<AuthLoginEntity> {
    const user = await this._loginRepository.login(body);
    const accessToken = this._jwtService.sign(user.getJwtPayload());
    if (!accessToken) {
      throw new InternalServerErrorException('accessTokenが作成出来ません。');
    }

    await this._accessTokenRepository
      .save(user.email, accessToken)
      .catch((err) => {
        throw new InternalServerErrorException(err);
      });
    return new AuthLoginEntity({
      token: accessToken,
    });
  }
}
