import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        //文件上传的地址
        destination: path.join(__dirname, '../uploads'),
        filename: (req, file, callback) => {
          const name = file.originalname.split('.')[0];
          const fileExtName = path.extname(file.originalname);
          callback(null, `${name}${fileExtName}`);
        },
      }),
    }),
    ServeStaticModule.forRoot({
      //静态文件目录
      rootPath: path.join(__dirname, '..', 'uploads'),
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
