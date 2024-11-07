import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { GetApiResponse } from 'src/util/decorators';
import { JwtAuthGuard } from '../auth/guards';

@ApiTags('获取用户接口')
@Controller('user')
export class UserController {
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  @GetApiResponse<UserEntity>(UserEntity, '获取所有信息')
  async findAll(@Req() req: any): Promise<UserEntity> {
    return new UserEntity({
      userId: req.user.id,
      userName: req.user.username,
      roles: ['R_SUPER'],
      buttons: [],
    });
    // return await this._infoService.findAll().catch((err) => {
    //   throw err;
    // });
  }
}
