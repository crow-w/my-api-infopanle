import { Controller, Get } from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiOkResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { LoggerService } from 'src/util/logger/logger.service';
import {
  HealthCheck,
  HealthCheckService,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@ApiTags()
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
    private readonly _logger: LoggerService,
  ) {}

  @Get()
  @HealthCheck()
  @ApiOperation({ summary: 'ヘルスチェック' })
  @ApiOkResponse({ description: 'ok' })
  @ApiInternalServerErrorResponse({ description: 'INTERNAL_SERVER_ERROR' })
  check() {
    return this.health.check([async () => this.db.pingCheck('database')]);
  }
}
