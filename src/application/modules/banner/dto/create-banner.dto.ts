import { IsInt, IsString } from 'class-validator';

export class CreateBannerDto {
  @IsString()
  url: string;

  @IsInt()
  sort: number;
}
