import { Injectable } from '@nestjs/common';
import { InfoRepository } from 'src/domain/repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Info } from './entities';
import { InfoEntity } from 'src/domain/entities';

@Injectable()
export class InfoRepositoryService implements InfoRepository {
  constructor(
    @InjectRepository(Info)
    private readonly _InfoReop: Repository<Info>,
  ) {}
  async findAll(): Promise<InfoEntity[]> {
    const where = {};
    const infoList = await this._InfoReop
      .find({
        select: [
          'id',
          'content',
          'imgs',
          'tel',
          'location',
          'status',
          'category',
          'times',
          'createTime',
          'updateTime',
        ],
        where,
      })
      .catch((err) => {
        throw err;
      });

    return infoList.map(
      (info) =>
        new InfoEntity({
          id: info.id,
          content: info.content,
          imgs: info.imgs,
          tel: info.tel,
          location: info.location,
          status: info.status,
          category: info.category,
          times: info.times,
          createTime: info.createTime,
          updateTime: info.updateTime,
        }),
    );
  }
}
