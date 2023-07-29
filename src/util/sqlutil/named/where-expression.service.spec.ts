import { Test } from '@nestjs/testing';
import { NamedWhereExpression } from './where-expression.service';

describe('NamedWhereExpression', () => {
  let _service: NamedWhereExpression;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [NamedWhereExpression],
    }).compile();

    _service = moduleRef.get<NamedWhereExpression>(NamedWhereExpression);
  });

  describe('Build Where Clause', () => {
    it('build in', async () => {
      const want1 = 'AND member_code IN (:...member_code)';
      const want2 = { member_code: ['03635'] };

      _service.in('member_code', ['03635']);
      expect(_service.query).toEqual(want1);
      expect(_service.bindValue).toEqual(want2);
    });

    it('Build in and equal', async () => {
      const want1 = [
        'AND member_code IN (:...member_code)',
        'AND organization_code = :organization_code',
      ].join('\n');
      const want2 = { member_code: ['03635'], organization_code: 444444 };

      _service.in('member_code', ['03635']).equal('organization_code', 444444);
      expect(_service.query).toEqual(want1);
      expect(_service.bindValue).toEqual(want2);
    });

    it('Build in AND equal AND between', async () => {
      const want1 = [
        'AND member_code IN (:...member_code)',
        'AND organization_code = :organization_code',
        'AND update_date BETWEEN :begin AND :end',
      ].join('\n');
      const want2 = {
        member_code: ['03635'],
        organization_code: 444444,
        begin: '2021-09-01',
        end: '2021-09-30',
      };

      _service
        .in('member_code', ['03635'])
        .equal('organization_code', 444444)
        .between('update_date', {
          begin: { key: 'begin', value: '2021-09-01' },
          end: { key: 'end', value: '2021-09-30' },
        });
      expect(_service.query).toEqual(want1);
      expect(_service.bindValue).toEqual(want2);
    });
    it('Build in AND Multi equal AND between', async () => {
      const want1 = [
        'AND member_code IN (:...member_code)',
        'AND organization_code = :organization_code',
        'AND update_date BETWEEN :begin AND :end',
        'AND update_member = :update_member',
      ].join('\n');
      const want2 = {
        member_code: ['03635'],
        organization_code: 444444,
        begin: '2021-09-01',
        end: '2021-09-30',
        update_member: '03625',
      };

      _service
        .in('member_code', ['03635'])
        .equal('organization_code', 444444)
        .between('update_date', {
          begin: { key: 'begin', value: '2021-09-01' },
          end: { key: 'end', value: '2021-09-30' },
        })
        .equal('update_member', '03625');
      expect(_service.query).toEqual(want1);
      expect(_service.bindValue).toEqual(want2);
    });
  });
});
