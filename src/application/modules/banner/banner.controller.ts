import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseGuards,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { BannerService } from './banner.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  DeleteApiResponse,
  GetApiResponse,
  PostApiResponse,
  PutApiResponse,
} from 'src/util/decorators';
import { JwtAuthGuard } from '../auth/guards';
import { CategoryEntities } from '../categories/entities/category.entity';
import { BannerEntities } from './entities/banner.entity';
import { BannerResultEntity } from './entities/banner-result.entity';
import { UpdateInfoDto } from '../info/dto/update-info.dto';
import { InfoResultEntity } from '../info/entities/info-no.entity';
import { DeleteInfoDto } from '../info/dto/delete-info.dto';
import { DeleteBannerDto } from './dto/delete-banner.dto';

@ApiTags('banner相关接口')
@Controller('banner')
export class BannerController {
  constructor(private readonly _bannerService: BannerService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  @PostApiResponse<BannerResultEntity>(BannerResultEntity, '发布广告')
  async create(@Res() res, @Body() createBannerDto: CreateBannerDto) {
    const resBody = await this._bannerService
      .handleCreate(createBannerDto)
      .catch((err: Error) => {
        throw err;
      });
    return res.status(HttpStatus.CREATED).send(resBody);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  @GetApiResponse<any>(BannerEntities, '获取所有Banner')
  async findAll(): Promise<any> {
    return await this._bannerService.findAll().catch((err) => {
      throw err;
    });
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put()
  @PutApiResponse<BannerResultEntity>(BannerResultEntity, '修改广告')
  async put(
    @Res() res,
    @Body() req: UpdateBannerDto,
  ): Promise<BannerResultEntity> {
    const resBody = await this._bannerService.handleUpdate(req).catch((err) => {
      throw err;
    });
    return res.status(HttpStatus.OK).send(resBody);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete()
  @DeleteApiResponse<BannerResultEntity>(BannerResultEntity, '删除广告')
  async delete(@Res() res, @Body() req: DeleteBannerDto) {
    const resBody = await this._bannerService.handleDelete(req).catch((err) => {
      throw err;
    });
    return res.status(HttpStatus.OK).send(resBody);
  }
}
