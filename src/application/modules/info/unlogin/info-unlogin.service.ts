import { Inject, Injectable } from '@nestjs/common';
import { InfoEntities, InfoEntity } from '../entities/info.entity';
import {
  INFO_REPOSITORY,
  InfoRepository,
} from 'src/domain/repository/info-repository.interface';
@Injectable()
export class InfoUnloginService {
  constructor(
    @Inject(INFO_REPOSITORY)
    private readonly _infoRepository: InfoRepository,
  ) {}

  async findAll(
    page: number,
    limit: number,
    category?: number,
  ): Promise<InfoEntities> {
    const res = await this._infoRepository
      .findAllUnlogin(page, limit, category)
      .catch((err) => {
        throw err;
      });
    const infoList = res.map(
      (data) =>
        new InfoEntity({
          id: data.id,
          uId: data.uId,
          username: data.username,
          avatarurl: data.avatarurl,
          content: data.content,
          imgs: data.imgs,
          tel: data.tel,
          location: data.location,
          status: data.status,
          category: data.category,
          times: data.times,
          createTime: data.createTime,
          updateTime: data.updateTime,
        }),
    );

    return {
      InfoList: infoList,
    };
  }
}
