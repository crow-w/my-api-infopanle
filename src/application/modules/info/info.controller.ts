import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { InfoService } from './info.service';
import { JwtAuthGuard } from '../auth/guards';
import {
  GetApiResponse,
  PostApiResponse,
  RequestUser,
} from 'src/util/decorators';
import { InfoEntities } from './entities/info.entity';
import { JwtPayload } from 'src/domain/entities/wxlogin.entity';
import { InfoResultEntity } from './entities/info-no.entity';
import { CreateInfoDto } from './dto/create-info.dto';

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

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  @PostApiResponse<InfoResultEntity>(InfoResultEntity, '发布信息')
  async create(
    @Res() res,
    @Body() req: CreateInfoDto,
    @RequestUser() user: JwtPayload,
  ) {
    const resBody = await this._infoService
      .handleCreate(req, user.id)
      .catch((err: Error) => {
        throw err;
      });
    return res.status(HttpStatus.CREATED).send(resBody);
  }
}
