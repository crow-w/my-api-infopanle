import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserRepository } from 'src/domain/repository';
import { InfoEntity } from 'src/domain/entities';
import { DbClientService } from 'src/infrastructure';
import { UserEntity } from 'src/application/modules/user/entities/user.entity';

@Injectable()
export class UserRepositoryService implements UserRepository {
  constructor(private readonly _dbClient: DbClientService) {}

  async findOne(): Promise<UserEntity> {
    const baseQuery = [
      'SELECT',
      ' user.*',
      ' , usr.username',
      ' , usr.avatarurl',
      'FROM',
      '   info inf',
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
}
