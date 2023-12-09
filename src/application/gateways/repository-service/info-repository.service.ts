import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InfoRepository } from 'src/domain/repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Entity, Repository, TransactionManager, getManager } from 'typeorm';
import { Info } from './entities';
import { InfoEntity } from 'src/domain/entities';
import { InfoResultEntity } from 'src/application/modules/info/entities/info-no.entity';
import { CreateInfoDto } from 'src/application/modules/info/dto/create-info.dto';
import { UuidService } from 'src/util/uuid';
import { DeleteInfoDto } from 'src/application/modules/info/dto/delete-info.dto';
import { UpdateInfoDto } from 'src/application/modules/info/dto/update-info.dto';

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
      await transactionalEntityManager.insert(Info, infoObj).catch((err) => {
        throw new InternalServerErrorException(err);
      });
    });
    return {
      infoNo: id,
      // 已发布，未审核
      infoStatus: 1,
    };
  }

  async handleDelete(req: DeleteInfoDto): Promise<InfoResultEntity> {
    await getManager().transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager
        .query(`UPDATE info SET status = 0 WHERE id = '${req.id}'`)
        .catch((err) => {
          throw err;
        });
    });

    return {
      infoNo: req.id,
      // 已删除
      infoStatus: 0,
    };
  }

  async handleUpdate(req: UpdateInfoDto): Promise<InfoResultEntity>{
    await getManager().transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager
        .update(Info, req.id, req)
        .catch((err) => {
          throw err;
        });
    });
    return {
      infoNo: req.id,
      // 已删除
      infoStatus: req.status,
    };
  }
}
