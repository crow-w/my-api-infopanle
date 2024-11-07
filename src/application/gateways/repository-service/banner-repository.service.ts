import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { BannerRepository } from 'src/domain/repository';
import { getManager } from 'typeorm';
import { UuidService } from 'src/util/uuid';
import { DbClientService } from 'src/infrastructure';
import { CreateBannerDto } from 'src/application/modules/banner/dto/create-banner.dto';
import { UpdateBannerDto } from 'src/application/modules/banner/dto/update-banner.dto';
import { BannerEntity } from 'src/application/modules/banner/entities/banner.entity';
import { Banner } from './entities';
import { BannerResultEntity } from 'src/application/modules/banner/entities/banner-result.entity';
@Injectable()
export class BannerRepositoryService implements BannerRepository {
  constructor(private readonly _dbClient: DbClientService) {}
  async findAll(): Promise<any> {
    const baseQuery = 'SELECT * FROM banner WHERE status > 0';

    const res = await this._dbClient.namedSelect(baseQuery).catch((err) => {
      throw new InternalServerErrorException(err);
    });
    return res.data.map(
      (banner) =>
        new BannerEntity({
          id: banner.id,
          url: banner.url,
          sort: banner.sort,
          status: banner.status,
          createTime: banner.createTime,
          updateTime: banner.updateTime,
        }),
    );
  }

  async handleCreate(req: CreateBannerDto): Promise<BannerResultEntity> {
    const id = UuidService.getUuid();
    await getManager().transaction(async (transactionalEntityManager) => {
      const bannerObj = { id: id, status: 1 };
      await transactionalEntityManager
        .insert(Banner, Object.assign(req, bannerObj))
        .catch((err) => {
          throw new InternalServerErrorException(err);
        });
    });
    return {
      bannerId: id,
      // 已发布，未审核
      bannerStatus: 1,
    };
  }

  async handleDelete(req: UpdateBannerDto): Promise<BannerResultEntity> {
    await getManager().transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager
        .query(`UPDATE banner SET status = 0 WHERE id = '${req.id}'`)
        .catch((err) => {
          throw err;
        });
    });

    return {
      bannerId: req.id,
      // 已删除
      bannerStatus: req.status,
    };
  }

  async handleUpdate(req: UpdateBannerDto): Promise<BannerResultEntity> {
    await getManager().transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager
        .update(Banner, req.id, req)
        .catch((err) => {
          throw err;
        });
    });
    return {
      bannerId: req.id,
      // 已删除
      bannerStatus: req.status,
    };
  }
}
