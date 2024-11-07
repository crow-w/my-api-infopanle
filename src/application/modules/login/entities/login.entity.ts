import { ApiProperty } from '@nestjs/swagger';

type AuthEntityEntityProps = {
  access_token: string;
  refresh_token: string;
};

export class AuthLoginEntity {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyQ29kZSI6IjAzNjM1Iiwic2hvc2hpa2lDb2RlIjoiMDEyMzQ1Njc4OSIsImlhdCI6MTYzNzk5NjA4MiwiZXhwIjoxNjM4MTY4ODgyfQ.QeTDDpc6yS6mKoMOVo4p8bqZ8ssYfvhBYZ4W_euEaGc',
    description: 'token',
  })
  public accessToken: string;

  @ApiProperty({
    example: 'dGhpcyBpcyBhIHJlZnJlc2ggdG9rZW4gZXhhbXBsZQ==',
    description: 'refresh token',
  })
  public refreshToken: string;

  constructor(props: AuthEntityEntityProps) {
    this.accessToken = props.access_token;
    this.refreshToken = props.refresh_token;
  }
}
