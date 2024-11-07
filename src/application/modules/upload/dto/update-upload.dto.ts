import { PartialType } from '@nestjs/swagger';
import { CreateUploadDto } from './create-upload.dto';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { extname } from 'path';
export class UpdateUploadDto extends PartialType(CreateUploadDto) {
  @ApiProperty({ type: 'string', format: 'binary' })
  @IsNotEmpty()
  file: any;

  validateFileTypes(fileTypes: string[]) {
    const fileExtName = extname(this['file'].originalname);
    return fileTypes.includes(fileExtName);
  }
}
