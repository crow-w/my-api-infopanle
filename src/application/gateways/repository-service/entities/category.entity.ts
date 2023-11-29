import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';

@Entity('category')
export class Category {
  @Column({
    primary: true,
    name: 'id',
    type: 'varchar',
    comment: '分类ID',
  })
  id: string;

  @Column({
    name: 'code',
    type: 'varchar',
    nullable: true,
    comment: '分类编码',
  })
  code: string;

  @Column({
    name: 'name',
    type: 'varchar',
    nullable: true,
    comment: '分类名称',
  })
  name: string;

  @Column({
    name: 'level',
    type: 'tinyint',
    nullable: true,
    comment: '层级',
  })
  level: number;

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
