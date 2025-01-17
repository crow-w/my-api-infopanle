import { CreateInfoDto } from 'src/application/modules/info/dto/create-info.dto';
import { DeleteInfoDto } from 'src/application/modules/info/dto/delete-info.dto';
import { InfoResultEntity } from 'src/application/modules/info/entities/info-no.entity';
import { InfoEntity } from '../entities';
import { UpdateInfoDto } from 'src/application/modules/info/dto/update-info.dto';
import { User } from 'src/application/gateways/repository-service/entities';

export const INFO_REPOSITORY = 'info_repository';

export interface InfoRepository {
  handleCreate(req: CreateInfoDto, uuid: string): Promise<InfoResultEntity>;
  findAll(): Promise<InfoResult[]>;
  handleDelete(req: DeleteInfoDto): Promise<InfoResultEntity>;
  handleUpdate(req: UpdateInfoDto): Promise<InfoResultEntity>;
  findAllUnlogin(
    page: number,
    limit: number,
    category?: number,
  ): Promise<InfoResult[]>;
}

export type InfoResult = {
  id: string;
  uId: string;
  username: string;
  avatarurl: string;
  content: string;
  imgs: string;
  tel: string;
  location: string;
  status: number;
  category: number;
  times: number;
  createTime: Date;
  updateTime: Date;
};
