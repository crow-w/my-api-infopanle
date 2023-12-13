import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'email' })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  public email: string;

  @ApiProperty({ example: 'password' })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  public password: string;
}
