import { Injectable } from '@nestjs/common';

export type BindValue = { [key: string]: any };

type KeyValue = {
  key: string;
  value: string;
};

type BetweenParameter = {
  begin: KeyValue;
  end: KeyValue;
};

@Injectable()
export class NamedWhereExpression {
  private _bindValue: BindValue;
  private _query: string[];

  constructor() {
    this._bindValue = {};
    this._query = [];
  }

  get bindValue(): BindValue {
    return this._bindValue;
  }

  get query(): string {
    return this._query.join('\n');
  }

  public equal(filed: string, value: any, valueName?: string): this {
    let name = filed;
    if (typeof valueName !== 'undefined') {
      name = valueName;
    }

    const query = `AND ${filed} = :${name}`;
    this._bindValue[name] = value;
    this._query.push(query);
    return this;
  }

  /**
   * filed: string
   * value: any[]
   * valueName?: string（option）
   */
  public in(filed: string, value: any[], valueName?: string): this {
    let name = filed;
    if (typeof valueName !== 'undefined') {
      name = valueName;
    }

    const query = `AND ${filed} IN (:...${name})`;
    this._bindValue[name] = value;
    this._query.push(query);
    return this;
  }

  public between(filed: string, value: BetweenParameter): this {
    const query = `AND ${filed} BETWEEN :${value.begin.key} AND :${value.end.key}`;

    const bindValue = {
      [value.begin.key]: value.begin.value,
      [value.end.key]: value.end.value,
    };
    this._bindValue = { ...this._bindValue, ...bindValue };
    this._query.push(query);
    return this;
  }

  /**
   * Condition is >=
   */
  public greaterThanEqual(filed: string, value: any, valueName?: string): this {
    let name = filed;
    if (typeof valueName !== 'undefined') {
      name = valueName;
    }

    const query = `AND ${filed} >= :${name}`;
    this._bindValue[name] = value;
    this._query.push(query);
    return this;
  }

  public greaterThan(filed: string, value: any, valueName?: string): this {
    let name = filed;
    if (typeof valueName !== 'undefined') {
      name = valueName;
    }

    const query = `AND ${filed} > :${name}`;
    this._bindValue[name] = value;
    this._query.push(query);
    return this;
  }

  public lessThanEqual(filed: string, value: any, valueName?: string): this {
    let name = filed;
    if (typeof valueName !== 'undefined') {
      name = valueName;
    }

    const query = `AND ${filed} <= :${name}`;
    this._bindValue[name] = value;
    this._query.push(query);
    return this;
  }

  public lessThan(filed: string, value: any, valueName?: string): this {
    let name = filed;
    if (typeof valueName !== 'undefined') {
      name = valueName;
    }

    const query = `AND ${filed} < :${name}`;
    this._bindValue[name] = value;
    this._query.push(query);
    return this;
  }
}
