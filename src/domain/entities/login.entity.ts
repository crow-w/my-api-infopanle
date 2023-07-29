import { UuidService } from 'src/util/uuid';

export type JwtPayload = {
  uuid: string;
  email: string;
};

type LoginEntityProps = {
  access_token: string;
  id_token: string;
  name: string;
  email: string;
};

export class LoginEntity {
  private readonly _accessToken: string;
  private readonly _idToken: string;
  private readonly _name: string;
  private readonly _email: string;

  constructor(props: LoginEntityProps) {
    this._accessToken = props.access_token;
    this._idToken = props.id_token;
    this._name = props.name;
    this._email = props.email;
  }

  public get idToken(): string {
    return this._idToken;
  }

  public get name(): string {
    return this._name;
  }

  public get email(): string {
    return this._email;
  }

  public getJwtPayload(): JwtPayload {
    return {
      uuid: UuidService.getUuid(),
      email: this._email,
    };
  }
}
