import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

type SelectResult<T> = {
  data: T;
};
type ExecResult<T> = {
  data: T;
};

type QueryParams = string | number | any[];
type NamedQueryParams = { [key: string]: any };

@Injectable()
export class DbClientService {
  constructor(private readonly _manager: EntityManager) {}

  public async select<T = any>(
    query: string,
    parameters?: QueryParams[],
  ): Promise<SelectResult<T>> {
    const data = await this._manager.query(query, parameters).catch((e) => {
      throw new Error(e);
    });

    return {
      data: data,
    };
  }

  // In case in (:...param)
  public async namedSelect<T = any>(
    query: string,
    parameters?: NamedQueryParams,
  ): Promise<SelectResult<T>> {
    const [q, bindValues] = this.named(query, parameters);
    const data = await this._manager.query(q, bindValues).catch((e) => {
      throw new Error(e);
    });

    return {
      data: data,
    };
  }

  public async exec<T = any>(query: string): Promise<ExecResult<T>> {
    const data = await this._manager.query(query).catch((e) => {
      throw new Error(e);
    });
    return {
      data: data,
    };
  }

  private named(query: string, parameters?: NamedQueryParams): [string, any[]] {
    const [q, bindValues] =
      this._manager.connection.driver.escapeQueryWithParameters(
        query,
        parameters,
        {},
      );
    return [q, bindValues];
  }
}
