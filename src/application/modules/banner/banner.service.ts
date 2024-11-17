import { Inject, Injectable } from '@nestjs/common';
import { CreateBannerDto } from './dto/create-banner.dto';
import { BannerEntities, BannerEntity } from './entities/banner.entity';
import { BANNER_REPOSITORY, BannerRepository } from 'src/domain/repository';
import { BannerResultEntity } from './entities/banner-result.entity';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { DeleteBannerDto } from './dto/delete-banner.dto';

@Injectable()
export class BannerService {
  constructor(
    @Inject(BANNER_REPOSITORY)
    private readonly _bannerRepository: BannerRepository,
  ) {}

  async findAll(): Promise<any> {
    const res = await this._bannerRepository.findAll().catch((err) => {
      throw err;
    });
    const bannerList = res.map(
      (data) =>
        new BannerEntity({
          id: data.id,
          url: data.url,
          sort: data.sort,
          status: data.status,
          createTime: data.createTime,
          updateTime: data.updateTime,
        }),
    );
    console.log('bannerList', bannerList);
    return {
      code: '0000',
      data: {
        current: 1,
        records: bannerList,
        size: 10,
        total: bannerList.length,
      },
      msg: 'success!!!',
    };
  }

  async handleCreate(req: CreateBannerDto): Promise<BannerResultEntity> {
    const res = await this._bannerRepository.handleCreate(req).catch((err) => {
      throw err;
    });

    return {
      bannerId: res.bannerId,
      bannerStatus: res.bannerStatus,
    };
  }

  async handleUpdate(req: UpdateBannerDto): Promise<BannerResultEntity> {
    const res = await this._bannerRepository.handleUpdate(req).catch((err) => {
      throw err;
    });
    return {
      bannerId: res.bannerId,
      bannerStatus: res.bannerStatus,
    };
  }

  async handleDelete(req: DeleteBannerDto): Promise<BannerResultEntity> {
    const res = await this._bannerRepository.handleDelete(req).catch((err) => {
      throw err;
    });
    console.log('delete res', res);
    return {
      bannerId: res.bannerId,
      bannerStatus: res.bannerStatus,
    };
  }
}
