import {
  IsString,
  IsOptional,
  IsInt,
  Min,
  Max,
  IsNotEmpty,
} from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsInt()
  parentId?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  @Min(1000)
  @Max(9999)
  @IsNotEmpty()
  identifier: number; // 四位数标识字段
}
