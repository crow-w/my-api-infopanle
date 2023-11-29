export const INFO_REPOSITORY = 'info_repository';

export interface InfoRepository {
  findAll(): Promise<InfoResult[]>;
}

export type InfoResult = {
  id: string;
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
