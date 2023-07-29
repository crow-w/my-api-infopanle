type TantoushaEntityProps = {
  cd: string;
  name: string;
};

export class TantoushaEntity {
  private readonly _cd: string;
  private readonly _name: string;

  constructor(props: TantoushaEntityProps) {
    this._cd = props.cd;
    this._name = props.name;
  }

  get cd(): string {
    return this._cd;
  }

  get name(): string {
    return this._name;
  }
}
