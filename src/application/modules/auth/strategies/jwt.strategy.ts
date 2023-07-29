import {
  Injectable,
  Inject,
  UnauthorizedException,
  InternalServerErrorException,
  HttpException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { jwtConstants } from '../../login/constants';
import { ACCESS_TOKEN_REPOSITORY } from 'src/domain/repository';
import { LoggerService } from 'src/util/logger/logger.service';

import type { AccessTokenRepository } from 'src/domain/repository';
import type { JwtPayloadInfo } from '../type';

const strategyOptions: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  ignoreExpiration: false,
  secretOrKey: jwtConstants.secret,
  algorithms: ['HS256'],
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  public constructor(
    @Inject(ACCESS_TOKEN_REPOSITORY)
    private readonly _accessTokenRepository: AccessTokenRepository,
    private _jwtService: JwtService,
    private readonly _loggerService: LoggerService,
  ) {
    super(strategyOptions);
  }

  public async validate(payload: JwtPayloadInfo): Promise<JwtPayloadInfo> {
    const token = await this._accessTokenRepository.get(payload.email);
    this._loggerService.debug(token);
    if (!token) {
      throw new UnauthorizedException(`have'n been authorized`);
    }

    // キャッシュに登録されているtokenとの整合性を確認
    const cashedTokenPayload = await this.decodeJwt(token).catch((e) => {
      if (e instanceof HttpException) {
        throw e;
      }
      throw new InternalServerErrorException();
    });

    if (cashedTokenPayload.uuid !== payload.uuid) {
      this._loggerService.debug(
        `cash token uuid is ${cashedTokenPayload.uuid}, incoming token uuid is ${payload.uuid}`,
      );
      throw new UnauthorizedException('invalid token is incoming');
    }

    return payload;
  }

  private async decodeJwt(token: string): Promise<JwtPayloadInfo> {
    const payload = this._jwtService.decode(token);

    if (!payload) {
      throw new UnauthorizedException('cannot decode cash-token');
    }

    if (typeof payload['uuid'] === 'undefined') {
      throw new UnauthorizedException('not exist uuid field');
    }

    if (typeof payload['email'] === 'undefined') {
      throw new UnauthorizedException('not exist email field');
    }

    return {
      uuid: payload['uuid'],
      email: payload['email'],
      iat: payload['iat'],
      exp: payload['exp'],
    };
  }
}
