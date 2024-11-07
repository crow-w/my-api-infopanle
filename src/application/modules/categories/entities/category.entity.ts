import { ApiProperty } from '@nestjs/swagger';

type CategoryEntityProps = {
  id: string;
  name: string;
  identifier: number;
  description?: string;
  parentId?: number;
  createdAt: Date;
  updatedAt: Date;
};

export class CategoryEntity {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the category',
  })
  id: string;

  @ApiProperty({
    example: 'Electronics',
    description: 'The name of the category',
  })
  name: string;

  @ApiProperty({
    example: 1234,
    description: 'A four-digit identifier for the category',
    required: true,
  })
  identifier: number;

  @ApiProperty({
    example: 'Category for electronic products',
    description: 'A description of the category',
    required: false,
  })
  description?: string;

  @ApiProperty({
    example: null,
    description: 'The parent category ID, if any',
    required: false,
  })
  parentId?: number;

  @ApiProperty({
    example: '2023-01-01T00:00:00Z',
    description: 'The creation date of the category',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2023-01-01T00:00:00Z',
    description: 'The last update date of the category',
  })
  updatedAt: Date;

  constructor(props: CategoryEntityProps) {
    this.id = props.id;
    this.name = props.name;
    this.identifier = props.identifier;
    this.description = props.description;
    this.parentId = props.parentId;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}

export class CategoryEntities {
  @ApiProperty({
    type: [CategoryEntity],
    description: '信息一览',
  })
  // eslint-disable-next-line @typescript-eslint/naming-convention
  public categoryList: CategoryEntity[];
}
