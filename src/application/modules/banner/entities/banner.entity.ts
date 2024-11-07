import { ApiProperty } from '@nestjs/swagger';

type BannerEntityProps = {
  id: string;
  url: string;
  sort: number;
  status: number;
  createTime: Date;
  updateTime: Date;
};

export class BannerEntity {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the category',
  })
  id: string;

  @ApiProperty({
    example: 'https://img.example.com/banner.jpg',
    description: '广告图片url',
  })
  url: string;

  @ApiProperty({
    example: 1,
    description: '排序',
  })
  sort: number;

  @ApiProperty({
    example: 1,
    description: '状态',
  })
  status: number;

  @ApiProperty({
    example: '2023-01-01',
    description: '创建日期',
  })
  createTime: Date;

  @ApiProperty({
    example: '2023-02-02',
    description: '更新日期',
  })
  updateTime: Date;

  constructor(props: BannerEntityProps) {
    this.id = props.id;
    this.url = props.url;
    this.sort = props.sort;
    this.status = props.status;
    this.createTime = props.createTime;
    this.updateTime = props.updateTime;
  }
}

export class BannerEntities {
  @ApiProperty({
    type: [BannerEntity],
    description: 'A list of banners',
  })
  public bannerList: BannerEntity[];
}
