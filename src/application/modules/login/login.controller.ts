import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginService } from './login.service';
import { LoginDto } from './dto';
import { AuthLoginEntity } from './entities';
import { PostGetApiResponse } from 'src/util/decorators';

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
}
