import { Test, TestingModule } from '@nestjs/testing';
import { FetchHomeService } from './fetch-home.service';

describe('FetchHomeService', () => {
  let service: FetchHomeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FetchHomeService],
    }).compile();

    service = module.get<FetchHomeService>(FetchHomeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
