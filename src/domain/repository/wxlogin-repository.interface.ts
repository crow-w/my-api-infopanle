import { WxloginEntity } from '../entities';

export const WXLOGIN_REPOSITORY = 'wxlogin_repository';

export interface WxloginRepository {
  login(authorizationCode: string): Promise<WxloginEntity>;
}
