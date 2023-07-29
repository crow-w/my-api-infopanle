import { Column, Entity } from 'typeorm';

@Entity('m_shokushu_category')
export class MShokushuCategory {
  @Column({
    primary: true,
    name: 'cd',
    type: 'varchar',
    length: 4,
    comment: '職種カテゴリコード',
  })
  cd: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 256,
    nullable: false,
    comment: '職種カテゴリ名',
  })
  name: string;

  @Column({
    name: 'order_no',
    type: 'int',
    nullable: false,
    comment: '並び順',
  })
  orderNo: number;

  @Column({
    name: 'delete_flg',
    type: 'tinyint',
    nullable: false,
    comment: '削除フラグ',
  })
  deleteFlg: number;
}
