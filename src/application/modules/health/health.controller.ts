import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiOkResponse,
  ApiInternalServerErrorResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { LoggerService } from 'src/util/logger/logger.service';
import {
  HealthCheck,
  HealthCheckService,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { JwtAuthGuard } from '../auth/guards';

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
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'ヘルスチェック' })
  @ApiOkResponse({ description: 'ok' })
  @ApiInternalServerErrorResponse({ description: 'INTERNAL_SERVER_ERROR' })
  check() {
    return this.health.check([async () => this.db.pingCheck('database')]);
  }
}
