import { ApiProperty } from '@nestjs/swagger';

type AuthEntityEntityProps = {
  token: string;
};

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
