import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';

@Entity('user')
export class User {
  @Column({
    primary: true,
    name: 'id',
    type: 'varchar',
    comment: '用户ID',
  })
  id: string;

  @Column({
    name: 'username',
    type: 'varchar',
    nullable: true,
    comment: '用户名称',
  })
  username: string;

  @Column({
    name: 'tel',
    type: 'varchar',
    length: 13,
    nullable: true,
    comment: '用户手机号',
  })
  tel: string;

  @Column({
    name: 'nickname',
    type: 'varchar',
    length: 24,
    nullable: true,
    comment: '用户微信昵称',
  })
  nickname: string;

  @Column({
    name: 'gender',
    type: 'tinyint',
    nullable: true,
    comment: '用户性别',
  })
  gender: number;

  @Column({
    name: 'avatarurl',
    type: 'varchar',
    nullable: true,
    comment: '用户头像url',
  })
  avatarurl: string;

  @Column({
    name: 'status',
    type: 'tinyint',
    nullable: true,
    comment: '账户状态',
  })
  stauts: number;

  @Column({
    name: 'openid',
    type: 'varchar',
    nullable: true,
    comment: '微信Id',
  })
  openid: string;

  @Column({
    name: 'session_key',
    type: 'varchar',
    nullable: true,
    comment: '微信会话密钥',
  })
  sessionKey: string;

  @CreateDateColumn({
    name: 'create_time',
    type: 'datetime',
    comment: '创建时间',
  })
  createTime: string;

  @UpdateDateColumn({
    name: 'update_time',
    type: 'datetime',
    comment: '更新时间',
  })
  updateTime: string;
}
