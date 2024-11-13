import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
@Module({
  imports: [],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
