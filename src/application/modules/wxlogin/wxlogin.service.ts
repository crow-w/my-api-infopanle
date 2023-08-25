import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  ACCESS_TOKEN_REPOSITORY,
  AccessTokenRepository,
  WXLOGIN_REPOSITORY,
  WxloginRepository,
} from 'src/domain/repository';
import { AuthWxloginEntity } from './entities';

@Injectable()
export class WxloginService {
  public constructor(
    private _jwtService: JwtService,
    @Inject(WXLOGIN_REPOSITORY)
    private readonly _wxloginRepository: WxloginRepository,

    @Inject(ACCESS_TOKEN_REPOSITORY)
    private readonly _accessTokenRepository: AccessTokenRepository,
  ) {}
  public async handleLogin(authorizationCode: string): Promise<any> {
    // Auth0 ログイン
    // 访问微信接口 获取openid 和昵称(向微信接口发送appid appsecret ) 返回session_key & openid 根据openid查询数据库 是否有 无代表未注册 自动注册一个用户
    const res = await this._wxloginRepository.login(authorizationCode);

    const accessToken = this._jwtService.sign(res.getJwtPayload());
    if (!accessToken) {
      throw new InternalServerErrorException('accessToken制作失败');
    }
    await this._accessTokenRepository
      .save(res.openid, accessToken)
      .catch((err) => {
        throw new InternalServerErrorException(err);
      });
    return new AuthWxloginEntity({
      token: accessToken,
    });
  }
}
