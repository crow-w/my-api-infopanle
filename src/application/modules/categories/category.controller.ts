import {
  Controller,
  Post,
  Body,
  Put,
  UseGuards,
  Res,
  HttpStatus,
  Delete,
  Get,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CategoryResultEntity } from './entities/category-no.entity';
import { JwtPayload } from 'src/domain/entities/wxlogin.entity';
import {
  DeleteApiResponse,
  GetApiResponse,
  PostApiResponse,
  PutApiResponse,
  RequestUser,
} from 'src/util/decorators';
import { JwtAuthGuard } from '../auth/guards';
import { DeleteCategoryDto } from './dto/delete-category.dto';
import { CategoryEntities } from './entities/category.entity';

@ApiTags('categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly _categoryService: CategoryService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  @GetApiResponse<CategoryEntities>(CategoryEntities, '获取所有信息')
  async findAll(): Promise<CategoryEntities> {
    return await this._categoryService.findAll().catch((err) => {
      throw err;
    });
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  @PostApiResponse<CategoryResultEntity>(CategoryResultEntity, '添加分类')
  async create(
    @Res() res,
    @Body() req: CreateCategoryDto,
  ): Promise<CategoryResultEntity> {
    const resBody = await this._categoryService
      .handleCreate(req)
      .catch((err: Error) => {
        throw err;
      });
    return res.status(HttpStatus.CREATED).send(resBody);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put()
  @PutApiResponse<CategoryResultEntity>(CategoryResultEntity, '修改分类')
  async update(
    @Res() res,
    @Body() req: UpdateCategoryDto,
  ): Promise<CategoryResultEntity> {
    const resBody = await this._categoryService
      .handleUpdate(req)
      .catch((err) => {
        throw err;
      });
    return res.status(HttpStatus.OK).send(resBody);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete()
  @DeleteApiResponse<CategoryResultEntity>(CategoryResultEntity, '删除分类')
  async delete(@Res() res, @Body() req: DeleteCategoryDto) {
    const resBody = await this._categoryService
      .handleDelete(req)
      .catch((err) => {
        throw err;
      });
    return res.status(HttpStatus.OK).send(resBody);
  }
}
