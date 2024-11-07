import { ApiProperty } from '@nestjs/swagger';

type CategoryResultEntityProps = {
  categoryId: string;
  CategoryStatus: number;
};

export class CategoryResultEntity {
  @ApiProperty({
    example: 1,
    description: '分类id',
  })
  categoryNo: string;

  @ApiProperty({
    example: 1,
    description: '分类状态状态',
  })
  categoryStatus: number;

  constructor(props: CategoryResultEntityProps) {
    this.categoryNo = props.categoryId;
    this.categoryStatus = props.CategoryStatus;
  }
}
