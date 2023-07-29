import { ApiProperty } from '@nestjs/swagger';

type AuthUserInfoEntityProps = {
  name: string;
  cd: string;
  email: string;
  bushoName: string;
  bushoCd: string;
};

type AuthEntityEntityProps = {
  accessToken: string;
  // authUserInfoEntity: AuthUserInfoEntityProps;
};

export class AuthUserInfoEntity {
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

  constructor(props: AuthUserInfoEntityProps) {
    this.name = props.name;
    this.cd = props.cd;
    this.bushoName = props.bushoName;
    this.bushoCd = props.bushoCd;
    this.email = props.email;
  }
}

export class AuthEntity {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyQ29kZSI6IjAzNjM1Iiwic2hvc2hpa2lDb2RlIjoiMDEyMzQ1Njc4OSIsImlhdCI6MTYzNzk5NjA4MiwiZXhwIjoxNjM4MTY4ODgyfQ.QeTDDpc6yS6mKoMOVo4p8bqZ8ssYfvhBYZ4W_euEaGc',
    description: 'アクセストークン',
  })
  public token: string;

  // TODO: user情報の付与
  // @ApiProperty({
  //   description: 'email',
  //   type: AuthUserInfoEntity,
  // })
  // public user: AuthUserInfoEntity;

  constructor(props: AuthEntityEntityProps) {
    this.token = props.accessToken;

    // TODO: user情報の付与
    // this.user = new AuthUserInfoEntity(props.authUserInfoEntity);
  }
}
