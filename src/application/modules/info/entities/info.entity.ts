import { ApiProperty } from '@nestjs/swagger';

type InfoEntityProps = {
  id: string;
  uId: string;
  username: string;
  avatarurl: string;
  content: string;
  imgs: string;
  tel: string;
  location: string;
  status: number;
  category: number;
  times: number;
  createTime: Date;
  updateTime: Date;
};

export class InfoEntity {
  @ApiProperty({
    example: 1,
    description: '信息id',
  })
  id: string;

  @ApiProperty({
    example: '',
    description: '用户Id',
  })
  uId: string;

  @ApiProperty({
    example: '',
    description: '用户名称',
  })
  username: string;

  @ApiProperty({
    example: '',
    description: '用户头像',
  })
  avatarurl: string;

  @ApiProperty({
    example: '收购二手小汽车',
    description: '文本内容',
  })
  content: string;

  @ApiProperty({
    example: 'http:img.org/',
    description: '图片',
  })
  imgs: string;

  @ApiProperty({
    example: '15771377335',
    description: '信息联系方式',
  })
  tel: string;

  @ApiProperty({
    example: '北京市昌平区南门外小学东100米',
    description: '位置信息',
  })
  location: string;

  @ApiProperty({
    example: 1,
    description: '信息状态',
  })
  status: number;

  @ApiProperty({
    example: '11',
    description: '分类',
  })
  category: number;

  @ApiProperty({
    example: 10,
    description: '浏览次数',
  })
  times: number;

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

  constructor(props: InfoEntityProps) {
    this.id = props.id;
    this.uId = props.uId;
    this.username = props.username;
    this.avatarurl = props.avatarurl;
    this.content = props.content;
    this.imgs = props.imgs;
    this.tel = props.tel;
    this.location = props.location;
    this.status = props.status;
    this.category = props.category;
    this.times = props.times;
    this.createTime = props.createTime;
    this.updateTime = props.updateTime;
  }
}

export class InfoEntities {
  @ApiProperty({
    type: [InfoEntity],
    description: '信息一览',
  })
  // eslint-disable-next-line @typescript-eslint/naming-convention
  public InfoList: InfoEntity[];
}
