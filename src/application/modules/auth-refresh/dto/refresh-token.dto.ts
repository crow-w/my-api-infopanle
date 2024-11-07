import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({
    description: '刷新令牌',
    example: 'your-refresh-token',
  })
  @IsString()
  public refreshToken: string;
}
