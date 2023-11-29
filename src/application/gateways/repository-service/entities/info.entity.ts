import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';

@Entity('info')
export class Info {
  @Column({
    primary: true,
    name: 'id',
    type: 'varchar',
    comment: '信息ID',
  })
  id: string;

  @Column({
    name: 'uId',
    type: 'varchar',
    comment: '用户Id',
  })
  uId: string;

  @Column({
    name: 'content',
    type: 'varchar',
    nullable: true,
    comment: '文本内容',
  })
  content: string;

  @Column({
    name: 'imgs',
    type: 'varchar',
    nullable: true,
    comment: '图片',
  })
  imgs: string;

  @Column({
    name: 'tel',
    type: 'varchar',
    length: 13,
    nullable: true,
    comment: '信息联系电话',
  })
  tel: string;

  @Column({
    name: 'location',
    type: 'varchar',
    nullable: true,
    comment: '位置信息',
  })
  location: string;

  @Column({
    name: 'status',
    type: 'tinyint',
    nullable: true,
    comment: '信息状态',
  })
  status: number;

  @Column({
    name: 'category',
    type: 'varchar',
    nullable: true,
    comment: '分类',
  })
  category: string;

  @Column({
    name: 'times',
    type: 'int',
    nullable: true,
    comment: '查看次数',
  })
  times: number;

  @CreateDateColumn({
    name: 'create_time',
    type: 'datetime',
    comment: '创建时间',
  })
  createTime: Date;

  @UpdateDateColumn({
    name: 'update_time',
    type: 'datetime',
    comment: '更新时间',
  })
  updateTime: Date;
}
