import { Injectable, Inject } from '@nestjs/common';
import { LoginEntity } from 'src/domain/entities';
import {
  HttpHandler,
  HTTP_HANDLER,
} from 'src/application/gateways/rpc-handler';

import { LoginRepository } from 'src/domain/repository/login-repository.interface';
import jwt_decode from 'jwt-decode';

@Injectable()
export class LoginRepositoryService implements LoginRepository {
  constructor(
    @Inject(HTTP_HANDLER)
    private readonly _loginHandler: HttpHandler,
  ) {}
  private readonly _url: string;

  async login(authorizationCode: string): Promise<LoginEntity> {
    // id_tokenとaccess_tokenを取得
    const loginData = await this._loginHandler
      .post<any, LoginEntity>(`${process.env.AUTHZ_URL}oauth/token`, null, {
        grant_type: 'authorization_code',
        code: authorizationCode,
        client_id: process.env.AUTHZ_CLIENT_ID,
        client_secret: process.env.AUTHZ_CLIENT_SECRET,
        redirect_uri: process.env.AUTHZ_REDIRECT_URI,
      })
      .catch((err) => {
        throw err;
      });
    const userData = jwt_decode(loginData.data['id_token']);

    // TODO:この辺の情報を必要に応じて変更
    return new LoginEntity({
      access_token: loginData.data['access_token'],
      id_token: loginData.data['id_token'],
      name: userData['nickname'],
      email: userData['email'],
    });
  }
}
