import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Max, Min } from 'class-validator';

export class UpdateCategoryDto {
  @ApiProperty({
    required: true,
    description: '分类id',
    example: '5a7258e5-6178-4075-a843-895de364d709',
  })
  @IsString()
  readonly id: string;

  @ApiProperty({ description: '分类名称', example: '人找车' })
  @IsString()
  readonly name?: string;

  @ApiProperty({ description: '父类', example: '顺风车' })
  @IsInt()
  readonly parentId?: number;

  @ApiProperty({ description: '分类描述', example: '这个是用于什么什么的分类' })
  @IsString()
  readonly description?: string;

  @ApiProperty({
    description: '分类标识（唯一）',
    example: '设定分类的固定表示',
  })
  @IsInt()
  @Min(1000)
  @Max(9999)
  readonly identifier?: number; // 四位数标识字段

  @ApiProperty({ description: '分类状态', example: '已删除' })
  @IsInt()
  readonly status?: number;
}
