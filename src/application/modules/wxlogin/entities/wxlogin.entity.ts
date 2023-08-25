import { ApiProperty } from '@nestjs/swagger';

type UserInfoEntityProps = {
  name: string;
  cd: string;
  email: string;
  bushoName: string;
  bushoCd: string;
};

type AuthEntityEntityProps = {
  token: string;
};

export class UserInfoEntity {
  @ApiProperty({
    example: '山田　太郎',
    description: '氏名',
  })
  public name: string;

  @ApiProperty({
    example: '03656',
    description: '従業員コード',
  })
  public cd: string;

  @ApiProperty({
    example: '次世代事業統括部 dip Robotics div Robo課',
    description: '所属部署名',
  })
  public bushoName: string;

  @ApiProperty({
    example: '099999998',
    description: '所属部署コード',
  })
  public bushoCd: string;

  @ApiProperty({
    example: 'testuser@example.com',
    description: 'email',
  })
  public email: string;

  constructor(props: UserInfoEntityProps) {
    this.name = props.name;
    this.cd = props.cd;
    this.bushoName = props.bushoName;
    this.bushoCd = props.bushoCd;
    this.email = props.email;
  }
}

export class AuthWxloginEntity {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyQ29kZSI6IjAzNjM1Iiwic2hvc2hpa2lDb2RlIjoiMDEyMzQ1Njc4OSIsImlhdCI6MTYzNzk5NjA4MiwiZXhwIjoxNjM4MTY4ODgyfQ.QeTDDpc6yS6mKoMOVo4p8bqZ8ssYfvhBYZ4W_euEaGc',
    description: 'token',
  })
  public token: string;

  constructor(props: AuthEntityEntityProps) {
    this.token = props.token;
  }
}
