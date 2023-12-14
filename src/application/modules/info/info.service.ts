import { Inject, Injectable } from '@nestjs/common';
import { InfoEntities, InfoEntity } from './entities/info.entity';
import {
  INFO_REPOSITORY,
  InfoRepository,
} from 'src/domain/repository/info-repository.interface';
import { InfoResultEntity } from './entities/info-no.entity';
import { CreateInfoDto } from './dto/create-info.dto';
import { DeleteInfoDto } from './dto/delete-info.dto';
import { UpdateInfoDto } from './dto/update-info.dto';

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

  async handleCreate(
    req: CreateInfoDto,
    uuid: string,
  ): Promise<InfoResultEntity> {
    const res = await this._infoRepository
      .handleCreate(req, uuid)
      .catch((err) => {
        throw err;
      });
    console.log('res', res);
    return {
      infoNo: res.infoNo,
      infoStatus: res.infoStatus,
    };
  }

  async handleDelete(req: DeleteInfoDto): Promise<InfoResultEntity> {
    const res = await this._infoRepository.handleDelete(req).catch((err) => {
      throw err;
    });
    console.log('delete res', res);
    return {
      infoNo: res.infoNo,
      infoStatus: res.infoStatus,
    };
  }

  async handleUpdate(req: UpdateInfoDto): Promise<InfoResultEntity> {
    const res = await this._infoRepository.handleUpdate(req).catch((err) => {
      throw err;
    });
    return {
      infoNo: res.infoNo,
      infoStatus: res.infoStatus,
    };
  }
}
