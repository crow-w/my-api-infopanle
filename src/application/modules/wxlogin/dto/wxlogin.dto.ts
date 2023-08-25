import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class WxloginDto {
  @ApiProperty({ example: 'xxxxxxxxxxxxxxxxxxxxx' })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  public authorizationCode: string;
}
