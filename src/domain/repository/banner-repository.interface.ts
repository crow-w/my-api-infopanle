import { CreateBannerDto } from 'src/application/modules/banner/dto/create-banner.dto';
import { DeleteBannerDto } from 'src/application/modules/banner/dto/delete-banner.dto';
import { UpdateBannerDto } from 'src/application/modules/banner/dto/update-banner.dto';
import { BannerResultEntity } from 'src/application/modules/banner/entities/banner-result.entity';

export const BANNER_REPOSITORY = 'banner_repository';

export interface BannerRepository {
  handleCreate(req: CreateBannerDto): Promise<BannerResultEntity>;
  findAll(): Promise<BannerResult[]>;
  handleUpdate(req: UpdateBannerDto): Promise<BannerResultEntity>;
  handleDelete(req: DeleteBannerDto): Promise<BannerResultEntity>;
}

export type BannerResult = {
  id: string;
  url: string;
  sort: number;
  status: number;
  createTime: Date;
  updateTime: Date;
};
