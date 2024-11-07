import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Max, Min } from 'class-validator';

export class UpdateInfoDto {
  @ApiProperty({
    required: true,
    description: '信息id',
    example: '5a7258e5-6178-4075-a843-895de364d709',
  })
  @IsString()
  readonly id: string;

  @ApiProperty({ description: '信息内容', example: '车找人 赛罕到二连' })
  @IsString()
  readonly content?: string;

  @ApiProperty({ description: '图片内容', example: 'http://imgs.src/1.png' })
  @IsString()
  readonly imgs?: string;

  @ApiProperty({ description: '联系方式', example: '15777777777' })
  @IsString()
  readonly tel?: string;

  @ApiProperty({ description: '地理位置', example: '坐标：111，111' })
  @IsString()
  readonly location?: string;

  @ApiProperty({ description: '信息状态', example: '已提交' })
  @IsInt()
  readonly status?: number;

  @ApiProperty({ description: '分类编码', example: 2200 })
  @IsInt()
  @Max(9999)
  @Min(1000)
  readonly category?: number;

  @ApiProperty({ description: '浏览次数', example: '1342' })
  @IsInt()
  readonly times?: number;
}
