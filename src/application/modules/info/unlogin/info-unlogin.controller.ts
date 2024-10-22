import { ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { GetApiResponse } from 'src/util/decorators';
import { InfoEntities } from '../entities/info.entity';
import { InfoUnloginService } from './info-unlogin.service';
@ApiTags('信息相关接口')
@Controller('info-unlogin')
export class InfoUnloginController {
  constructor(private readonly _infoUnloginService: InfoUnloginService) {}

  @Get()
  @GetApiResponse<InfoEntities>(null, '未登录用户获取所有信息')
  async findAll(): Promise<InfoEntities> {
    return await this._infoUnloginService.findAll().catch((err) => {
      throw err;
    });
  }
}
