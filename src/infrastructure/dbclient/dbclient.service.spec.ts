import { Test } from '@nestjs/testing';
import { DbClientService } from './dbclient.service';
import { EntityManager, Connection, ConnectionOptions } from 'typeorm';
import { getEntityManagerToken } from '@nestjs/typeorm';

describe('DbClientService', () => {
  let _service: DbClientService;

  beforeEach(async () => {
    const option: ConnectionOptions = { type: 'mysql' };
    const coon = new Connection(option);

    const moduleRef = await Test.createTestingModule({
      controllers: [],
      imports: [],
      providers: [
        DbClientService,
        {
          provide: getEntityManagerToken(),
          useValue: new EntityManager(coon),
        },
      ],
    }).compile();
    _service = moduleRef.get<DbClientService>(DbClientService);
  });

  describe('Build Where Clause', () => {
    it('Equal single', async () => {
      const arg1 = 'SELECT * FROM member WHERE code = :code';
      const arg2 = { code: 1234 };
      const want1 = 'SELECT * FROM member WHERE code = ?';
      const want2 = [1234];
      const [query, bind] = _service['named'](arg1, arg2);

      expect(query).toBe(want1);
      expect(bind).toEqual(want2);
    });
    it('Equal Multi', async () => {
      const arg1 = 'SELECT * FROM member WHERE code = :code AND name = :name';
      const arg2 = { name: '山田', code: 1234 };
      const want1 = 'SELECT * FROM member WHERE code = ? AND name = ?';
      const want2 = [1234, '山田'];
      const [query, bind] = _service['named'](arg1, arg2);

      expect(query).toBe(want1);
      expect(bind).toEqual(want2);
    });

    it('Equal AND In', async () => {
      const arg1 =
        'SELECT * FROM member WHERE code IN (:...code) AND name = :name';
      const arg2 = { name: '山田', code: [1, 2, 3] };
      const want1 = 'SELECT * FROM member WHERE code IN (?, ?, ?) AND name = ?';
      const want2 = [1, 2, 3, '山田'];
      const [query, bind] = _service['named'](arg1, arg2);

      expect(query).toBe(want1);
      expect(bind).toEqual(want2);
    });

    it('Equal AND In AND BETWEEN', async () => {
      const arg1 =
        'SELECT * FROM member WHERE code IN (:...code) AND name = :name AND update_date BETWEEN :begin AND :end';
      const arg2 = {
        name: '山田',
        code: [1, 2, 3],
        begin: '2021-02-01',
        end: '2022-02-01',
      };
      const want1 =
        'SELECT * FROM member WHERE code IN (?, ?, ?) AND name = ? AND update_date BETWEEN ? AND ?';
      const want2 = [1, 2, 3, '山田', '2021-02-01', '2022-02-01'];
      const [query, bind] = _service['named'](arg1, arg2);

      expect(query).toBe(want1);
      expect(bind).toEqual(want2);
    });
  });
});
