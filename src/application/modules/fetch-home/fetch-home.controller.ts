import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FetchHomeService } from './fetch-home.service';
import { GetApiResponse } from 'src/util/decorators';
import { JwtAuthGuard } from '../auth/guards';
import { FetcthHomeEntity } from './entitties/fetch-home.entity';
import { CategoryService } from '../categories/category.service';
import { BannerService } from '../banner/banner.service';

@ApiTags('获取首页数据')
@Controller('fetch-home')
export class FetchHomeController {
  constructor(
    private readonly _categoryService: CategoryService,
    private readonly _bannerService: BannerService,
  ) {}

  // swiper & category\
  /**
   *
   * @returns {
   *  "swiper":
   *      [ { "id": 1, "imgUrl": "https://img.yzcdn.cn/vant/apple-1.jpg" },
   *      { "id": 2, "imgUrl": "https://img.yzcdn.cn/vant/apple-2.jpg" },
   *      { "id": 3, "imgUrl": "https://img.yzcdn.cn/vant/apple-3.jpg" } ],
   *  "category":
   *      [ { "categpryIdentifier": 1, "categoryName": "专属推荐" },
   *      { "categpryIdentifier": 2, "categoryName": "手机数码" },]
   * }
   * @description 获取首页数据
   */
  // TODO: 实现获取首页数据的逻辑
  @Get()
  @GetApiResponse<FetcthHomeEntity>(FetcthHomeEntity, '获取首页数据')
  async find(): Promise<FetcthHomeEntity> {
    const categories = await this._categoryService.findAll().catch((err) => {
      throw err;
    });
    const bannerList = await this._bannerService.findAll().catch((err) => {
      throw err;
    });
    return new FetcthHomeEntity({
      categories: categories.categoryList,
      bannerList: bannerList.bannerList,
    });
  }
}
