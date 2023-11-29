import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FetchHomeService } from './fetch-home.service';
import { GetApiResponse } from 'src/util/decorators';
import { JwtAuthGuard } from '../auth/guards';

@ApiTags('获取首页数据')
@Controller('fetch-home')
export class FetchHomeController {
  constructor(private readonly _fetchHomeService: FetchHomeService) {}

  // // swiper & tabList
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  // @Get()
  // @GetApiResponse<HomeEntities>(InfoEntities, '获取首页数据')
  // async find(): Promise<InfoEntities> {
  //   return await this._infoService.findAll().catch((err) => {
  //     throw err;
  //   });
  // }
}
