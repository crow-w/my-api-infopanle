import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginService } from './login.service';
import { LoginDto } from './dto';
import { AuthLoginEntity } from './entities';
import { PostGetApiResponse } from 'src/util/decorators';
import { RefreshTokenDto } from '../auth-refresh/dto/refresh-token.dto';

@ApiTags('ログイン')
@Controller('login')
export class LoginController {
  constructor(private readonly _loginService: LoginService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @PostGetApiResponse()
  async login(@Body() body: LoginDto): Promise<AuthLoginEntity> {
    return await this._loginService.handleLogin(body).catch((err) => {
      throw err;
    });
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @PostGetApiResponse()
  async refreshToken(@Body() body: RefreshTokenDto) {
    return await this._loginService
      .refreshToken(body.refreshToken)
      .catch((err) => {
        throw err;
      });
  }
}
