import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { InfoService } from './info.service';
import { JwtAuthGuard } from '../auth/guards';
import {
  DeleteApiResponse,
  GetApiResponse,
  PostApiResponse,
  PutApiResponse,
  RequestUser,
} from 'src/util/decorators';
import { InfoEntities } from './entities/info.entity';
import { JwtPayload } from 'src/domain/entities/wxlogin.entity';
import { InfoResultEntity } from './entities/info-no.entity';
import { CreateInfoDto } from './dto/create-info.dto';
import { DeleteInfoDto } from './dto/delete-info.dto';
import { InfoEntity } from 'src/domain/entities';
import { UpdateInfoDto } from './dto/update-info.dto';

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

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete()
  @DeleteApiResponse<InfoResultEntity>(InfoResultEntity, '删除信息')
  async delete(@Res() res, @Body() req: DeleteInfoDto) {
    const resBody = await this._infoService.handleDelete(req).catch((err) => {
      throw err;
    });
    return res.status(HttpStatus.OK).send(resBody);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put()
  @PutApiResponse<InfoResultEntity>(InfoResultEntity, '修改信息')
  async put(@Res() res, @Body() req: UpdateInfoDto): Promise<InfoResultEntity> {
    const resBody = await this._infoService.handleUpdate(req).catch((err) => {
      throw err;
    });
    return res.status(HttpStatus.OK).send(resBody);
  }
}
