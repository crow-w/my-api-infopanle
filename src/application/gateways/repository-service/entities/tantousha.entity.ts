import { Column, Entity } from 'typeorm';

@Entity('m_dairiten_tantousha')
export class MTantousha {
  @Column({
    primary: true,
    name: 'id',
    type: 'int',
    comment: 'ID',
  })
  id: number;

  @Column({
    name: 'dairiten_cd',
    type: 'varchar',
    length: 9,
    nullable: false,
    comment: '代理店CD',
  })
  dairitenCd: string;

  @Column({
    name: 'cd',
    type: 'varchar',
    length: 13,
    nullable: false,
    comment: '代理店担当者CD',
  })
  cd: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 24,
    nullable: false,
    comment: '代理店担当者名',
  })
  name: string;

  @Column({
    name: 'no_use_flag',
    type: 'tinyint',
    comment: '使用停止フラグ',
  })
  noUseFlag: number;

  @Column({
    name: 'order_no',
    type: 'int',
    comment: '並び順',
  })
  orderNo: number;
}
