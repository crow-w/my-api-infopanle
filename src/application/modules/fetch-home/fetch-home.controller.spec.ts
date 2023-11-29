import { Test, TestingModule } from '@nestjs/testing';
import { FetchHomeController } from './fetch-home.controller';

describe('FetchHomeController', () => {
  let controller: FetchHomeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FetchHomeController],
    }).compile();

    controller = module.get<FetchHomeController>(FetchHomeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
