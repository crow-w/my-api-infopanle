import {
  Injectable,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  ACCESS_TOKEN_REPOSITORY,
  LOGIN_REPOSITORY,
} from 'src/domain/repository';
import type {
  AccessTokenRepository,
  LoginRepository,
} from 'src/domain/repository';
import { AuthEntity } from './entities';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
  public constructor(
    private _jwtService: JwtService,
    @Inject(LOGIN_REPOSITORY)
    private readonly _loginRepository: LoginRepository,
    @Inject(ACCESS_TOKEN_REPOSITORY)
    private readonly _accessTokenRepository: AccessTokenRepository,
  ) {}

  public async handleLogin(authorizationCode: string): Promise<AuthEntity> {
    // Auth0 ログイン
    const res = await this._loginRepository.login(authorizationCode);

    // アクセストークン生成
    const accessToken = this._jwtService.sign(res.getJwtPayload());
    if (!accessToken) {
      throw new InternalServerErrorException('accessTokenが作成出来ません。');
    }

    await this._accessTokenRepository
      .save(res.email, accessToken)
      .catch((err) => {
        throw new InternalServerErrorException(err);
      });
    return new AuthEntity({
      accessToken: accessToken,
    });
  }
}
