import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthRefreshService } from './auth-refresh.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@ApiTags('authRefresh')
@Controller('authRefresh')
export class AuthRefreshController {
  constructor(private readonly _authRefreshService: AuthRefreshService) {}

  @Post('refresh-token')
  @ApiOperation({ summary: '刷新令牌' })
  @ApiResponse({ status: 200, description: '令牌刷新成功' })
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this._authRefreshService.refreshToken(refreshTokenDto.refreshToken);
  }
}
