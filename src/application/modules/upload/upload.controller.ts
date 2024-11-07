import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Res,
  Req,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FastifyRequest } from 'fastify';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { ApiConsumes, ApiBody, ApiTags } from '@nestjs/swagger';
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  //跳过身份校验
  @Post()
  @ApiTags('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload file',
    type: UpdateUploadDto,
  })
  async uploadFile(@Req() req: FastifyRequest, @Res() res) {
    console.log('file', req);
    res.sendResponse('上传成功', true, '上传成功');
  }
}
