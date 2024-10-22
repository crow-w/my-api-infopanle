export type JwtPayload2 = {
  email: string;
  password: string;
  username: string;
  id: string;
};

type LoginEntityProps = {
  email: string;
  password: string;
  username: string;
  id: string;
};

export class LoginEntity {
  private readonly _email: string;
  private readonly _password: string;
  private readonly _username: string;
  private readonly _id: string;

  constructor(props: LoginEntityProps) {
    this._email = props.email;
    this._password = props.password;
    this._username = props.username;
    this._id = props.id;
  }

  public get email(): string {
    return this._email;
  }

  public get password(): string {
    return this._password;
  }

  public get username(): string {
    return this._username;
  }

  public get id(): string {
    return this._id;
  }

  public getJwtPayload(): JwtPayload2 {
    return {
      email: this._email,
      password: this._password,
      username: this._username,
      id: this._id,
    };
  }
}
