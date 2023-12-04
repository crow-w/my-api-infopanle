import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InfoRepository } from 'src/domain/repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';
import { Info } from './entities';
import { InfoEntity } from 'src/domain/entities';
import { InfoResultEntity } from 'src/application/modules/info/entities/info-no.entity';
import { CreateInfoDto } from 'src/application/modules/info/dto/create-info.dto';
import { UuidService } from 'src/util/uuid';

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
          'uId',
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
          uId: info.uId,
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

  async handleCreate(
    req: CreateInfoDto,
    uuid: string,
  ): Promise<InfoResultEntity> {
    const id = UuidService.getUuid();
    await getManager().transaction(async (transactionalEntityManager) => {
      const infoObj = { id: id, uId: uuid, ...req };
      console.log('test', infoObj);
      await transactionalEntityManager.insert(Info, infoObj).catch((err) => {
        throw new InternalServerErrorException(err);
      });
    });
    return {
      infoNo: id,
      infoStatus: 1,
    };
  }
}
