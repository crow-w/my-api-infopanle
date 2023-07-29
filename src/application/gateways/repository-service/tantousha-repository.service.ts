import { Injectable } from '@nestjs/common';
import { TantoushaEntity } from 'src/domain/entities';
import { TantoushaRepository } from 'src/domain/repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MTantousha } from './entities';

@Injectable()
export class TantoushaRepositoryService implements TantoushaRepository {
  constructor(
    @InjectRepository(MTantousha)
    private readonly _mTantoushaReop: Repository<MTantousha>,
  ) {}
  async findAll(): Promise<TantoushaEntity[]> {
    const where = {};
    where['noUseFlag'] = 0;
    const mTantoushaList = await this._mTantoushaReop
      .find({
        select: ['cd', 'name'],
        where,
        order: {
          orderNo: 'ASC',
        },
      })
      .catch((err) => {
        throw err;
      });

    return mTantoushaList.map(
      (tantousha) =>
        new TantoushaEntity({ cd: tantousha.cd, name: tantousha.name }),
    );
  }
}
