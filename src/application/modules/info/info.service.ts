import { Inject, Injectable } from '@nestjs/common';
import { InfoEntities, InfoEntity } from './entities/info.entity';
import {
  INFO_REPOSITORY,
  InfoRepository,
} from 'src/domain/repository/info-repository.interface';

@Injectable()
export class InfoService {
  constructor(
    @Inject(INFO_REPOSITORY)
    private readonly _infoRepository: InfoRepository,
  ) {}

  async findAll(): Promise<InfoEntities> {
    const res = await this._infoRepository.findAll().catch((err) => {
      throw err;
    });

    const infoList = res.map(
      (data) =>
        new InfoEntity({
          id: data.id,
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
