import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Max, Min } from 'class-validator';

export class UpdateBannerDto {
  @ApiProperty({
    required: true,
    description: 'bannerId',
    example: '5a7258e5-6178-4075-a843-895de364d709',
  })
  @IsString()
  readonly id: string;

  @ApiProperty({ description: '分类名称', example: '人找车' })
  @IsString()
  readonly url?: string;

  @ApiProperty({ description: '父类', example: '顺风车' })
  @IsInt()
  readonly sort?: number;

  @ApiProperty({ description: '分类描述', example: '这个是用于什么什么的分类' })
  @IsInt()
  readonly status?: number;
}
