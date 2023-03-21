import { Injectable } from '@nestjs/common';
import { Pizza } from './entities/pizza.entity';

@Injectable()
export class PizzasService {
  private pizzas: Pizza[] = [
    {
      id: 1,
      name: 'Tropicana',
      brand: 'Pizza Hut',
      flavors: ['Ananás', 'Tomate'],
    },
  ];

  findAll() {
    return this.pizzas;
  }

  findOne(id: string) {
    return this.pizzas.find((pizza) => id === String(pizza.id));
  }

  create(createPizzaDto: any) {
    this.pizzas.push(createPizzaDto);
  }

  update(id: string, updatePizzaDto: any) {
    const existingPizza = this.findOne(id);

    if (existingPizza) {
      // update it
    }
  }

  delete(id: string) {
    this.pizzas = this.pizzas.filter((pizza) => id !== String(pizza.id));
  }
}
