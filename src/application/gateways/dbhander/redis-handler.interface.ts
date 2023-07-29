export const REDIS_HANDLER = 'redis_handler';

export interface RedisHandler {
  set(key: string, value: string, expireIn?: number): Promise<string | null>;
  get(key: string): Promise<string | null>;
}
