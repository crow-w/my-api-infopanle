import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DeleteCategoryDto {
  @ApiProperty({
    description: '分类ID',
    example: '5a7258e5-6178-4075-a843-895de364d709',
  })
  @IsString()
  readonly id: string;
}
