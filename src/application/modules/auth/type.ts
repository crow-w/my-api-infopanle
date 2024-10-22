import type { JwtPayload } from 'src/domain/entities/wxlogin.entity';
import type { JwtPayload2 } from 'src/domain/entities/login.entity';

export type JwtPayloadInfo = JwtPayload & {
  iat: number;
  exp: number;
} & JwtPayload2;
