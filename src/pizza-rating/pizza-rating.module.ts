import { Module } from '@nestjs/common';
import { PizzasModule } from 'src/pizzas/pizzas.module';
import { PizzaRatingService } from './pizza-rating.service';

@Module({
  imports: [PizzasModule],
  providers: [PizzaRatingService],
})
export class PizzaRatingModule {}
