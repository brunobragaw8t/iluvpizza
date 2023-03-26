import { Test, TestingModule } from '@nestjs/testing';
import { PizzaRatingService } from './pizza-rating.service';

describe('PizzaRatingService', () => {
  let service: PizzaRatingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PizzaRatingService],
    }).compile();

    service = module.get<PizzaRatingService>(PizzaRatingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
