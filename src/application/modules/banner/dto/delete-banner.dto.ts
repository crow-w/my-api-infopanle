import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Max, Min } from 'class-validator';

export class DeleteBannerDto {
  @ApiProperty({
    required: true,
    description: 'bannerId',
    example: '5a7258e5-6178-4075-a843-895de364d709',
  })
  @IsString()
  readonly id: string;
}
