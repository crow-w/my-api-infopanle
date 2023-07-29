import { Injectable, Inject } from '@nestjs/common';
import { REDIS_HANDLER } from 'src/application/gateways/dbhander';

import type { RedisHandler } from 'src/application/gateways/dbhander';
import type { AccessTokenRepository } from 'src/domain/repository';

@Injectable()
export class AccessTokenRepositoryService implements AccessTokenRepository {
  private readonly _expireIn: number;
  constructor(
    @Inject(REDIS_HANDLER)
    private readonly _redisHandler: RedisHandler,
  ) {
    this._expireIn = 1209600; // ２週間
  }

  async save(userCd: string, token: string): Promise<void> {
    await this._redisHandler.set(userCd, token, this._expireIn).catch((e) => {
      throw new Error(e);
    });
    return;
  }

  async get(key: string): Promise<string> {
    const value = await this._redisHandler.get(key).catch((e) => {
      throw new Error(e);
    });
    return value;
  }
}
