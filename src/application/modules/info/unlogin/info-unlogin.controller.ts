import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query } from '@nestjs/common';
import { GetApiResponse } from 'src/util/decorators';
import { InfoEntities } from '../entities/info.entity';
import { InfoUnloginService } from './info-unlogin.service';
@ApiTags('信息相关接口')
@Controller('info-unlogin')
export class InfoUnloginController {
  constructor(private readonly _infoUnloginService: InfoUnloginService) {}

  @Get()
  @ApiQuery({ name: 'category', required: false, description: '分类' })
  @ApiQuery({ name: 'page', required: true, description: '当前页码' })
  @ApiQuery({ name: 'limit', required: true, description: '每页记录数' })
  @GetApiResponse<InfoEntities>(null, '未登录用户获取所有信息')
  async findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('category') category?: number,
  ): Promise<InfoEntities> {
    return await this._infoUnloginService
      .findAll(page, limit, category)
      .catch((err) => {
        throw err;
      });
  }
}
