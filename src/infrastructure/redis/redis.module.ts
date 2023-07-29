import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { LoggerModule } from 'src/util/logger/logger.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [],
  providers: [RedisService],
  imports: [LoggerModule, ConfigModule],
  exports: [RedisService],
})
export class RedisModule {}
