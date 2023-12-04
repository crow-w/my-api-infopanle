export type JwtPayload = {
  session_key: string;
  openid: string;
  id: string;
};

type LoginEntityProps = {
  id: string;
  openid: string;
  session_key: string;
};

export class WxloginEntity {
  private readonly _id: string;
  private readonly _sessionKey: string;
  private readonly _openid: string;

  constructor(props: LoginEntityProps) {
    this._id = props.id;
    this._sessionKey = props.session_key;
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
      session_key: this._sessionKey,
      openid: this._openid,
      id: this._id,
    };
  }
}
