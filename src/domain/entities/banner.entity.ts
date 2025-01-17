type BannerEntityProps = {
  id: string;
  content: string;
  imgs: string;
  tel: string;
  location: string;
  status: number;
  category: string;
  times: number;
  createTime: Date;
  updateTime: Date;
};

export class BannerEntity {
  private readonly _id: string;
  private readonly _content: string;
  private readonly _imgs: string;
  private readonly _tel: string;
  private readonly _location: string;
  private readonly _status: number;
  private readonly _category: string;
  private readonly _times: number;
  private readonly _createTime: Date;
  private readonly _updateTime: Date;

  constructor(props: BannerEntityProps) {
    this._id = props.id;
    this._content = props.content;
    this._imgs = props.imgs;
    this._tel = props.tel;
    this._location = props.location;
    this._status = props.status;
    this._category = props.category;
    this._times = props.times;
    this._createTime = props.createTime;
    this._updateTime = props.updateTime;
  }

  public get id(): string {
    return this._id;
  }

  public get content(): string {
    return this._content;
  }

  public get imgs(): string {
    return this._imgs;
  }

  public get tel(): string {
    return this._tel;
  }

  public get location(): string {
    return this._location;
  }

  public get status(): number {
    return this._status;
  }

  public get category(): string {
    return this._category;
  }

  public get times(): number {
    return this._times;
  }

  public get createTime(): Date {
    return this._createTime;
  }

  public get updateTime(): Date {
    return this._updateTime;
  }
}
