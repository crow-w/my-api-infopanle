import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InfoRepository, InfoResult } from 'src/domain/repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Entity, Repository, TransactionManager, getManager } from 'typeorm';
import { Info, User } from './entities';
import { InfoEntity } from 'src/domain/entities';
import { InfoResultEntity } from 'src/application/modules/info/entities/info-no.entity';
import { CreateInfoDto } from 'src/application/modules/info/dto/create-info.dto';
import { UuidService } from 'src/util/uuid';
import { DeleteInfoDto } from 'src/application/modules/info/dto/delete-info.dto';
import { UpdateInfoDto } from 'src/application/modules/info/dto/update-info.dto';
import { DbClientService } from 'src/infrastructure';

@Injectable()
export class InfoRepositoryService implements InfoRepository {
  constructor(private readonly _dbClient: DbClientService) {}

  async findAllUnlogin(
    page: number,
    limit: number,
    category?: number,
  ): Promise<InfoResult[]> {
    console.log('here!');
    const offset = (page - 1) * limit;
    let baseQuery = [
      'SELECT',
      ' inf.*',
      ' , usr.username',
      ' , usr.avatarurl',
      'FROM',
      '   info inf',
      'LEFT JOIN',
      '   user usr',
      'ON',
      '   inf.uId = usr.id',
      'WHERE',
      '    inf.status > 1',
    ].join('\n');
    if (category) {
      baseQuery += [` AND inf.category = ${category}`].join('\n');
    }
    baseQuery += [
      `
      ORDER BY
          inf.create_time desc
      LIMIT ${limit} OFFSET ${offset}
    `,
    ].join('\n');
    const res = await this._dbClient.namedSelect(baseQuery).catch((err) => {
      throw new InternalServerErrorException(err);
    });

    return res.data.map(
      (info) =>
        new InfoEntity({
          id: info.id,
          uId: info.uId,
          username: info.username,
          avatarurl: info.avatarurl,
          content: info.content,
          imgs: info.imgs,
          tel: info.tel,
          location: info.location,
          status: info.status,
          category: info.category,
          times: info.times,
          createTime: info.create_time,
          updateTime: info.update_time,
        }),
    );
  }
  async findAll(): Promise<any> {
    const baseQuery = [
      'SELECT',
      ' inf.*',
      ' , usr.username',
      ' , usr.avatarurl',
      'FROM',
      '   info inf',
      'LEFT JOIN',
      '   user usr',
      'ON',
      '   inf.uId = usr.id',
      'ORDER BY',
      '    inf.create_time desc',
      // 'WHERE',
      // '    inf.status > 1',
    ].join('\n');

    const res = await this._dbClient.namedSelect(baseQuery).catch((err) => {
      throw new InternalServerErrorException(err);
    });
    const where = {};
    // const infoList = await this._InfoReop
    //   .find({
    //     select: [
    //       'id',
    //       'uId',
    //       'content',
    //       'imgs',
    //       'tel',
    //       'location',
    //       'status',
    //       'category',
    //       'times',
    //       'createTime',
    //       'updateTime',
    //     ],
    //     where,
    //     order: { createTime: 'DESC' },
    //   })
    //   .catch((err) => {
    //     throw err;
    //   });
    console.log('res', res);
    return res.data.map(
      (info) =>
        new InfoEntity({
          id: info.id,
          uId: info.uId,
          username: info.username,
          avatarurl: info.avatarurl,
          content: info.content,
          imgs: info.imgs,
          tel: info.tel,
          location: info.location,
          status: info.status,
          category: info.category,
          times: info.times,
          createTime: info.create_time,
          updateTime: info.update_time,
        }),
    );
  }

  async handleCreate(
    req: CreateInfoDto,
    uuid: string,
  ): Promise<InfoResultEntity> {
    const id = UuidService.getUuid();
    await getManager().transaction(async (transactionalEntityManager) => {
      const infoObj = { id: id, status: 1, uId: uuid };
      await transactionalEntityManager
        .insert(Info, Object.assign(req, infoObj))
        .catch((err) => {
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

  async handleUpdate(req: UpdateInfoDto): Promise<InfoResultEntity> {
    await getManager().transaction(async (transactionalEntityManager) => {
      console.log('here an errr', Info, req.id, req);
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
