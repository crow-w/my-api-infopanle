import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import * as fs from 'fs';
import * as path from 'path';
import { pipeline } from 'stream';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { JwtAuthGuard } from '../auth/guards';
import { UploadService } from './upload.service';
@ApiTags('upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly _infoService: UploadService) {}
  //
  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Upload a file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File upload',
    type: UpdateUploadDto,
  })
  async uploadFile(@Req() request: FastifyRequest) {
    const uploadDir = path.join(__dirname, '../../../', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    const parts = request.parts();
    const savedFiles = [];

    for await (const part of parts) {
      if (part.file) {
        const filename = `${Date.now()}-${part.filename}`;
        const filepath = path.join(uploadDir, filename);

        // 手动封装 `pipeline` 为 Promise
        await new Promise((resolve, reject) => {
          pipeline(part.file, fs.createWriteStream(filepath), (err) => {
            if (err) {
              reject(err);
            } else {
              resolve(null);
            }
          });
        });

        const fileUrl = `/uploads/${filename}`;
        savedFiles.push({ filename: part.filename, url: fileUrl });
      }
    }

    return {
      message: 'Files uploaded successfully',
      files: savedFiles,
    };
  }
}
