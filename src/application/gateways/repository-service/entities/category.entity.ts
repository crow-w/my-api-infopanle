import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('categories')
export class Category {
  @Column({
    primary: true,
    name: 'id',
    type: 'varchar',
    comment: '分类ID',
  })
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ManyToOne(() => Category, (category) => category.children, {
    nullable: true,
  })
  parent: Category;

  @OneToMany(() => Category, (category) => category.parent)
  children: Category[];

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({
    name: 'status',
    type: 'tinyint',
    nullable: true,
    comment: '分类状态',
  })
  status: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column({ type: 'int', nullable: false })
  identifier: number; // 新的四位数标识字段
}
