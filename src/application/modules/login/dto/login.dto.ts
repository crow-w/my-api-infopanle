import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'xxxxxxxxxxxxxxxxxxxxx' })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  public authorizationCode: string;
}
