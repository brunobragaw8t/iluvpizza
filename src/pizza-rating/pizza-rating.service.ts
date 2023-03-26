import { Injectable } from '@nestjs/common';
import { PizzasService } from 'src/pizzas/pizzas.service';

@Injectable()
export class PizzaRatingService {
  constructor(private readonly pizzasService: PizzasService) {}
}
