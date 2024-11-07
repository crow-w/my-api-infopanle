import { ApiProperty } from '@nestjs/swagger';

type InfoEntityProps = {
  userId: string;
  userName: string;
  roles: string[];
  buttons: string[];
};

export class UserEntity {
  @ApiProperty({
    example: 1,
    description: '用户id',
  })
  userId: string;

  @ApiProperty({
    example: '',
    description: '用户昵称',
  })
  userName: string;

  @ApiProperty({
    example: '',
    description: '用户角色',
  })
  roles: string[];

  @ApiProperty({
    example: '',
    description: '用户按钮权限',
  })
  buttons: string[];

  constructor(props: InfoEntityProps) {
    this.userId = props.userId;
    this.userName = props.userName;
    this.roles = props.roles;
    this.buttons = props.buttons;
  }
}
