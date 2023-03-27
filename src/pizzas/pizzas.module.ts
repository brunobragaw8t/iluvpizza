import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist';
import { Event, EventSchema } from 'src/events/entities/event.entity';
import { Pizza, PizzaSchema } from './entities/pizza.entity';
import { PIZZA_BRANDS } from './pizzas.constants';
import { PizzasController } from './pizzas.controller';
import { PizzasService } from './pizzas.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Pizza.name, schema: PizzaSchema },
      { name: Event.name, schema: EventSchema },
    ]),
  ],
  controllers: [PizzasController],
  providers: [
    PizzasService,
    { provide: PIZZA_BRANDS, useValue: ['Telepizza', 'Pizza Hut'] },
  ],
  exports: [PizzasService],
})
export class PizzasModule {}
