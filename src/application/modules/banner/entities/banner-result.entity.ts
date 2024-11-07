import { ApiProperty } from '@nestjs/swagger';

type BannerResultEntityProps = {
  bannerId: string;
  bannerStatus: number;
};

export class BannerResultEntity {
  @ApiProperty({
    example: 1,
    description: 'bannerid',
  })
  bannerId: string;

  @ApiProperty({
    example: 1,
    description: 'banner状态',
  })
  bannerStatus: number;

  constructor(props: BannerResultEntityProps) {
    this.bannerId = props.bannerId;
    this.bannerStatus = props.bannerStatus;
  }
}
