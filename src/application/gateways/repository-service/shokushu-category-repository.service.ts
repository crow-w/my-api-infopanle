import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShokushuCategory } from 'src/domain/entities';
import { Like, Repository } from 'typeorm';
import { ShokushuCategoryRepository } from 'src/domain/repository';
import { MShokushuCategory } from './entities';
import type {
  ShokushuCategoryParams,
  ShokushuCategoryResult,
} from 'src/domain/repository';

@Injectable()
export class ShokushuCategoryRepositoryService
  implements ShokushuCategoryRepository
{
  constructor(
    @InjectRepository(MShokushuCategory)
    private readonly _mShokushuCategoryRepo: Repository<MShokushuCategory>,
  ) {}

  async findByName(
    params: ShokushuCategoryParams,
  ): Promise<ShokushuCategoryResult[]> {
    const where = {};
    where['deleteFlg'] = 0;

    if (params.name) {
      where['name'] = Like(`%${params.name}%`);
    }

    const mShokushuCategoryList = await this._mShokushuCategoryRepo
      .find({
        select: ['cd', 'name'],
        where,
        order: {
          orderNo: 'ASC',
        },
      })
      .catch((err) => {
        throw new InternalServerErrorException(err);
      });
    return mShokushuCategoryList.map(
      (shokushuCategory) =>
        new ShokushuCategory({
          cd: shokushuCategory.cd,
          name: shokushuCategory.name,
        }),
    );
  }
}
