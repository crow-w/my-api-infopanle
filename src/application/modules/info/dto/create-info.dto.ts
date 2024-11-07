import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateInfoDto {
  @ApiProperty({ description: '信息内容', example: '车找人 赛罕到二连' })
  @IsString()
  @IsNotEmpty()
  readonly content: string;

  @ApiProperty({ description: '图片内容', example: 'http://imgs.src/1.png' })
  @IsString()
  @IsOptional()
  readonly imgs?: string;

  @ApiProperty({ description: '联系方式', example: '15777777777' })
  @IsString()
  @IsNotEmpty()
  readonly tel: string;

  @ApiProperty({ description: '地理位置', example: '坐标：111，111' })
  @IsString()
  @IsOptional()
  readonly location?: string;

  @ApiProperty({ description: '分类编码', example: 1100 })
  @IsInt()
  @IsNotEmpty()
  @Max(9999)
  @Min(1000)
  readonly category: number;
}
