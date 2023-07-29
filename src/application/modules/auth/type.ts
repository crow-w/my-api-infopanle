import type { JwtPayload } from 'src/domain/entities';

export type JwtPayloadInfo = JwtPayload & {
  iat: number;
  exp: number;
};
