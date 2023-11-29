import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { InfoService } from './info.service';
import { JwtAuthGuard } from '../auth/guards';
import { GetApiResponse } from 'src/util/decorators';
import { InfoEntities } from './entities/info.entity';

@ApiTags('信息相关接口')
@Controller('info')
export class InfoController {
  constructor(private readonly _infoService: InfoService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  @GetApiResponse<InfoEntities>(InfoEntities, '获取所有信息')
  async findAll(): Promise<InfoEntities> {
    return await this._infoService.findAll().catch((err) => {
      throw err;
    });
  }
}
