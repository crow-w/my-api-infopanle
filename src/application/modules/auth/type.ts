import type { JwtPayload } from 'src/domain/entities/wxlogin.entity';

export type JwtPayloadInfo = JwtPayload & {
  iat: number;
  exp: number;
};
