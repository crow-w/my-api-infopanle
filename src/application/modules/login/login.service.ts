import {
  Injectable,
  Inject,
  InternalServerErrorException,
  BadRequestException,
  UnauthorizedException,
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
import { AuthRefreshService } from '../auth-refresh/auth-refresh.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LoginService {
  public constructor(
    private _jwtService: JwtService,
    private _authRefreshService: AuthRefreshService,
    @Inject(LOGIN_REPOSITORY)
    private readonly _loginRepository: LoginRepository,
    @Inject(ACCESS_TOKEN_REPOSITORY)
    private readonly _accessTokenRepository: AccessTokenRepository,
  ) {}
  // 访问令牌 刷新令牌 用户信息 访问令牌和刷令牌的有效期
  public async handleLogin(body: LoginDto): Promise<AuthLoginEntity> {
    const user = await this._loginRepository.login(body);
    const accessToken = this._jwtService.sign(user.getJwtPayload());
    const refreshToken = this._authRefreshService.generateRefreshToken(
      user.getJwtPayload(),
    );
    if (!accessToken) {
      throw new InternalServerErrorException('accessTokenが作成出来ません。');
    }

    await this._accessTokenRepository
      .save(user.email, accessToken)
      .catch((err) => {
        throw new InternalServerErrorException(err);
      });
    return new AuthLoginEntity({
      access_token: accessToken,
      refresh_token: refreshToken,
    });
  }
  // 刷新token接口
  async refreshToken(refreshToken: string) {
    try {
      const payload = this._jwtService.verify(refreshToken);
      const newAccessToken = this._jwtService.sign({
        email: payload.email,
        password: payload.password,
        username: payload.username,
        id: payload.id,
      });
      const newRefreshToken = this._authRefreshService.generateRefreshToken({
        email: payload.email,
        password: payload.password,
        username: payload.username,
        id: payload.id,
      });
      console.log('newAccessToken', newAccessToken);
      return {
        access_token: newAccessToken,
        refresh_token: newRefreshToken,
      };
    } catch (e) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
