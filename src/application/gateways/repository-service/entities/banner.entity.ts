import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';

@Entity('banner')
export class Banner {
  @Column({
    primary: true,
    name: 'id',
    type: 'varchar',
    comment: '信息ID',
  })
  id: string;

  @Column({
    name: 'url',
    type: 'varchar',
    nullable: true,
    comment: '图片url',
  })
  url: string;

  @Column({
    name: 'sort',
    type: 'tinyint',
    nullable: true,
    comment: '排序',
  })
  sort: number;

  @Column({
    name: 'status',
    type: 'tinyint',
    nullable: true,
    comment: '状态',
  })
  status: number;

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
