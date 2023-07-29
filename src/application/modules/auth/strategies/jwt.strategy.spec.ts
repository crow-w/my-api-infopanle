import { Test } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { JwtService } from '@nestjs/jwt';
import { ACCESS_TOKEN_REPOSITORY } from 'src/domain/repository';
import { LoggerModule } from 'src/util/logger/logger.module';
import type { AccessTokenRepository } from 'src/domain/repository';
import { UuidService } from 'src/util/uuid';
import type { JwtPayloadInfo } from '../type';

class AccessTokenRepositoryServiceMock implements AccessTokenRepository {
  /* eslint-disable */
  async save(email: string, token: string): Promise<void> {
    /* eslint-enable */
    return;
  }

  async get(key: string): Promise<string> {
    if (key === 'ok') {
      return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiNDcxOWVmMzQtNWFkZC00NDFlLTkyZGUtNzZkZDRjOGIzYTU3IiwiZW1haWwiOiJkaXAud2ViLnRlYW0ra2Vpc3VrZS1va3VtYUBnbWFpbC5jb20iLCJpYXQiOjE2NTk0MjgxNDQsImV4cCI6MTY1OTYwMDk0NH0.ScDV4zAkVghdvjDwEH4S6_da7c7KGhopn4F_o6bH9eY';
    }
    if (key === 'ng01') {
      return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiNmQyZGIwOTQtNDI5NC00NGY0LWJlZDEtNzA3YTk1MmEzMzBkIiwidXNlckNvZGUiOiIwMzYzNSIsImlhdCI6MTYzODA5MDg2MSwiZXhwIjoxNjM4MjYzNjYxfQ.2ZjOSiSx9QKseAfWG6P51qMIkFhlPQmXibzQiwmIiU0';
    }
    return null;
  }
}

describe('JwtStrategy', () => {
  let _jwtStrategy: JwtStrategy;
  let _jwtService: JwtService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      imports: [
        LoggerModule,
        JwtModule.register({
          secret: '123456789',
          signOptions: { expiresIn: '2 days' },
        }),
      ],
      providers: [
        JwtStrategy,
        {
          provide: ACCESS_TOKEN_REPOSITORY,
          useClass: AccessTokenRepositoryServiceMock,
        },
      ],
    }).compile();
    _jwtStrategy = moduleRef.get<JwtStrategy>(JwtStrategy);
    _jwtService = moduleRef.get<JwtService>(JwtService);
  });

  describe('validate()', () => {
    it('TEST01: 正常系', async () => {
      const arg1: JwtPayloadInfo = {
        uuid: '4719ef34-5add-441e-92de-76dd4c8b3a57',
        email: 'ok',
        iat: 333333333,
        exp: 444444444,
      };
      expect(await _jwtStrategy.validate(arg1)).toEqual(arg1);
    });

    it('TEST02: 異常系（Cashからデータが取得できないケース）', async () => {
      const arg1: JwtPayloadInfo = {
        uuid: '5b1eb479-1487-4196-b318-a910db931aad',
        email: 'ng',
        iat: 333333333,
        exp: 444444444,
      };

      await expect(_jwtStrategy.validate(arg1)).rejects.toThrowError(
        UnauthorizedException,
      );
      await expect(_jwtStrategy.validate(arg1)).rejects.toThrowError(
        `have'n been authorized`,
      );
    });

    it('TEST03: 異常系（Cashに登録されているとtokenが不正ケース）', async () => {
      const arg1: JwtPayloadInfo = {
        uuid: '5b1eb479-1487-4196-b318-a910db931aad',
        email: 'ng01',
        iat: 333333333,
        exp: 444444444,
      };
      await expect(_jwtStrategy.validate(arg1)).rejects.toThrowError(
        UnauthorizedException,
      );
      await expect(_jwtStrategy.validate(arg1)).rejects.toThrowError(
        `not exist email field`,
      );
    });

    it('TEST04: 異常系（Cashとアクセスに使用されたtokenがマッチしないケース）', async () => {
      const arg1: JwtPayloadInfo = {
        uuid: '5b1eb479-1487-4196-b318-a910db931a11',
        email: 'ok',
        iat: 333333333,
        exp: 444444444,
      };
      await expect(_jwtStrategy.validate(arg1)).rejects.toThrowError(
        UnauthorizedException,
      );
      await expect(_jwtStrategy.validate(arg1)).rejects.toThrowError(
        `invalid token is incoming`,
      );
    });
  });

  describe('decodeJwt()', () => {
    it('TEST01: 正常系', async () => {
      const payload = {
        uuid: UuidService.getUuid(),
        email: 'jiro.ueda@example.com',
      };
      const arg1 = _jwtService.sign(payload);
      const want1 = _jwtService.decode(arg1);
      expect(await _jwtStrategy['decodeJwt'](arg1)).toEqual(want1);
    });

    it('TEST02: 異常系（decodeした結果uuidがundefine）', async () => {
      const payload = {};
      const arg1 = _jwtService.sign(payload);
      await expect(_jwtStrategy['decodeJwt'](arg1)).rejects.toThrowError(
        UnauthorizedException,
      );
      await expect(_jwtStrategy['decodeJwt'](arg1)).rejects.toThrowError(
        'not exist uuid field',
      );
    });

    it('TEST03: 異常系（decodeした結果のpayloadガNULL）', async () => {
      await expect(_jwtStrategy['decodeJwt']('wwww')).rejects.toThrowError(
        UnauthorizedException,
      );
      await expect(_jwtStrategy['decodeJwt']('wwww')).rejects.toThrowError(
        'cannot decode cash-token',
      );
    });

    it('TEST04: 異常系（decodeした結果emailがundefine）', async () => {
      const payload = {
        uuid: UuidService.getUuid(),
      };
      const arg1 = _jwtService.sign(payload);
      await expect(_jwtStrategy['decodeJwt'](arg1)).rejects.toThrowError(
        UnauthorizedException,
      );
      await expect(_jwtStrategy['decodeJwt'](arg1)).rejects.toThrowError(
        'not exist email field',
      );
    });
  });
});
