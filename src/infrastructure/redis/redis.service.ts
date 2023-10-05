import { Injectable } from '@nestjs/common';
import * as RedisLib from 'ioredis';
import { ConfigService } from '@nestjs/config';

import type { RedisHandler } from 'src/application/gateways/dbhander';

@Injectable()
export class RedisService implements RedisHandler {
  private readonly _redis: RedisLib.Redis;
  private readonly _expireIn: number;

  constructor(private _configService: ConfigService) {
    this._redis = new RedisLib({
      host: this._configService.get<string>('REDIS_HOST') || '127.0.0.1',
      port: this._configService.get<number>('REDIS_PORT') || 6379,
      username: undefined, // options.username || undefined,
      password: undefined, // options.password || undefined,
      db: 0, // options.db || 0,
    });
    this._expireIn =
      this._configService.get<number>('REDIS_EXPIRE_IN') || 86400; // Second（defult 1日）
  }

  async set(
    key: string,
    value: string,
    expireIn?: number,
  ): Promise<string | null> {
    let exIn = this._expireIn;
    if (typeof expireIn !== 'undefined') {
      exIn = expireIn;
    }
    return await this._redis.set(key, value, 'ex', exIn).catch((e) => {
      throw new Error(e);
    });
  }

  async get(key: string): Promise<string | null> {
    return await this._redis.get(key).catch((e) => {
      throw new Error(e);
    });
  }
}
