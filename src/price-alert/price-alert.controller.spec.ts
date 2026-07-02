import { Test, TestingModule } from '@nestjs/testing';
import { PriceAlertController } from './price-alert.controller';

describe('PriceAlertController', () => {
  let controller: PriceAlertController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PriceAlertController],
    }).compile();

    controller = module.get<PriceAlertController>(PriceAlertController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
