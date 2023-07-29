import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { LoggerModule } from 'src/util/logger/logger.module';

@Module({
  controllers: [HealthController],
  imports: [LoggerModule, TerminusModule],
})
export class HealthModule {}
