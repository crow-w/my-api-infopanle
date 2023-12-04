import { CreateInfoDto } from 'src/application/modules/info/dto/create-info.dto';
import { InfoResultEntity } from 'src/application/modules/info/entities/info-no.entity';

export const INFO_REPOSITORY = 'info_repository';

export interface InfoRepository {
  handleCreate(req: CreateInfoDto, uuid: string): Promise<InfoResultEntity>;
  findAll(): Promise<InfoResult[]>;
}

export type InfoResult = {
  id: string;
  uId: string;
  content: string;
  imgs: string;
  tel: string;
  location: string;
  status: number;
  category: string;
  times: number;
  createTime: Date;
  updateTime: Date;
};
