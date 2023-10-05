import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { WxloginEntity } from 'src/domain/entities';
import {
  HttpHandler,
  HTTP_HANDLER,
} from 'src/application/gateways/rpc-handler';

import { WxloginRepository } from 'src/domain/repository/wxlogin-repository.interface';
import { User } from './entities';
import { Repository } from 'typeorm';
import { UuidService } from 'src/util/uuid';
import { WxloginEntity } from 'src/domain/entities';

@Injectable()
export class WxloginRepositoryService implements WxloginRepository {
  constructor(
    @Inject(HTTP_HANDLER)
    private readonly _loginHandler: HttpHandler,
    @InjectRepository(User)
    private readonly _userRepository: Repository<User>,
  ) {}
  // 从小程序获取code 并通过request 访问微信接口获取用户openID和session_key
  async login(authorizationCode: string): Promise<WxloginEntity> {
    const loginData = await this._loginHandler
      .get<any, any>(`${process.env.AUTHZ_URL}`, null, {
        appid: process.env.APP_ID,
        secret: process.env.SECRET,
        js_code: authorizationCode,
        grant_type: 'authorization_code',
      })
      .catch((err) => {
        throw err;
      });
    // 根据用户openID查询数据库，如果有返回用户 如果没有插入用户
    // where['stauts'] = 0;
    let user = undefined;
    if (loginData.data.openid) {
      user = await this._userRepository
        .findOne({ openid: loginData.data.openid })
        .catch((err) => {
          throw err;
        });
      if (!user) {
        user = await this._userRepository.insert({
          id: UuidService.getUuid(),
          openid: loginData.data.openid,
          sessionKey: loginData.data.session_key,
        });
      }
    }

    return new WxloginEntity({
      id: user.id,
      session_key: user.session_key,
      openid: user.openid,
    });
  }
}
