import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ShokushuCategory } from 'src/domain/entities';
import { MShokushuCategory } from './entities';
import { ShokushuCategoryRepositoryService } from './shokushu-category-repository.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import type {
  ShokushuCategoryParams,
  ShokushuCategoryResult,
} from 'src/domain/repository';

const mockRepository = () => ({
  find: jest.fn(),
});

describe('ShokushuCategoryRepositoryService', () => {
  let _service: ShokushuCategoryRepositoryService;
  let _repository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShokushuCategoryRepositoryService,
        {
          provide: getRepositoryToken(MShokushuCategory),
          useFactory: mockRepository,
        },
      ],
    }).compile();

    _service = await module.get<ShokushuCategoryRepositoryService>(
      ShokushuCategoryRepositoryService,
    );
    _repository = module.get(getRepositoryToken(MShokushuCategory));
  });

  describe('findByName()', () => {
    const mockShokushuCategoryList = [
      {
        cd: '1',
        name: 'アパレル・雑貨販売',
        orderNo: 1,
      },
    ];
    it('TEST01: 正常系', async () => {
      _repository.find.mockResolvedValue(mockShokushuCategoryList);
      expect(_repository.find).not.toHaveBeenCalled();

      const params: ShokushuCategoryParams = {
        name: 'TEST1',
      };
      const want: ShokushuCategoryResult[] = [
        new ShokushuCategory({
          cd: '1',
          name: 'アパレル・雑貨販売',
        }),
      ];

      const result = await _service.findByName(params);
      expect(_repository.find).toHaveBeenCalled();
      expect(result).toEqual(want);
    });

    it('TEST02: 異常系（サーバエラー）', async () => {
      _repository.find.mockImplementation(() => {
        throw new InternalServerErrorException('サーバエラー');
      });
      expect(_repository.find).not.toHaveBeenCalled();

      const params: ShokushuCategoryParams = {
        name: 'TEST2',
      };
      await expect(_service.findByName(params)).rejects.toThrowError(
        InternalServerErrorException,
      );
      await expect(_service.findByName(params)).rejects.toThrowError(
        'サーバエラー',
      );
    });
  });
});
