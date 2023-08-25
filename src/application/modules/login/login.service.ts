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
    // 访问微信接口 获取openid 和昵称(向微信接口发送appid appsecret ) 返回session_key & openid 根据openid查询数据库 是否有 无代表未注册 自动注册一个用户
    const res = await this._loginRepository.login(authorizationCode);
    // 生成token
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
