import { Controller, Post, Req } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import * as fs from 'fs';
import * as path from 'path';
import { pipeline } from 'stream';
import { UpdateUploadDto } from './dto/update-upload.dto';
@ApiTags('upload')
@Controller('upload')
export class UploadController {
  @Post()
  @ApiOperation({ summary: 'Upload a file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File upload',
    type: UpdateUploadDto,
  })
  async uploadFile(@Req() request: FastifyRequest) {
    const uploadDir = path.join(__dirname, '../../../', 'uploads');
    console.log('dir', uploadDir);
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
