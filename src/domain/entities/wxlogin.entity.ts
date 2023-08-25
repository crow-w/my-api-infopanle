import { UuidService } from 'src/util/uuid';

export type JwtPayload = {
  uuid: string;
  openid: string;
};

type LoginEntityProps = {
  id: string;
  openid: string;
};

export class WxloginEntity {
  private readonly _id: string;
  private readonly _openid: string;

  constructor(props: LoginEntityProps) {
    this._id = props.id;
    this._openid = props.openid;
  }

  public get id(): string {
    return this._id;
  }

  public get openid(): string {
    return this._openid;
  }

  public getJwtPayload(): JwtPayload {
    return {
      uuid: UuidService.getUuid(),
      openid: this._openid,
    };
  }
}
