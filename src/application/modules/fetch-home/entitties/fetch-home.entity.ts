import { ApiProperty } from '@nestjs/swagger';
import { CategoryEntity } from '../../categories/entities/category.entity';
import { BannerEntity } from '../../banner/entities/banner.entity';

type FetcthHomeEntityProps = {
  categories: CategoryEntity[];
  bannerList: BannerEntity[];
};

export class FetcthHomeEntity {
  @ApiProperty({
    example: 1,
    description: '首页数据',
  })
  categories: CategoryEntity[];

  @ApiProperty({
    example: 1,
    description: '首页数据',
  })
  bannerList: BannerEntity[];

  constructor(props: FetcthHomeEntityProps) {
    this.categories = props.categories;
    this.bannerList = props.bannerList;
  }
}
