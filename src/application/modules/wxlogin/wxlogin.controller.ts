import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { WxloginService } from './wxlogin.service';
import { ApiTags } from '@nestjs/swagger';
import { WxloginDto } from './dto/index';
import { PostGetApiResponse } from 'src/util/decorators';
import { AuthWxloginEntity } from './entities/wxlogin.entity';

@ApiTags('wxlogin')
@Controller('wxlogin')
export class WxloginController {
  constructor(private readonly _wxloginService: WxloginService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @PostGetApiResponse()
  async login(@Body() body: WxloginDto): Promise<AuthWxloginEntity> {
    return await this._wxloginService
      .handleLogin(body.authorizationCode)
      .catch((err) => {
        throw err;
      });
  }
}
