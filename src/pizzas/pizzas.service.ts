import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose/dist';
import { Connection, Model } from 'mongoose';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CreatePizzaDto } from './dto/create-pizza.dto';
import { UpdatePizzaDto } from './dto/update-pizza.dto';
import { Pizza } from './entities/pizza.entity';
import { PIZZA_BRANDS } from './pizzas.constants';

@Injectable()
export class PizzasService {
  constructor(
    @InjectModel(Pizza.name) private readonly pizzaModel: Model<Pizza>,
    @InjectConnection() private readonly connection: Connection,
    @InjectModel(Event.name) private readonly eventModel: Model<Event>,
    @Inject(PIZZA_BRANDS) pizzaBrands: string[],
  ) {
    console.log(pizzaBrands);
  }

  async findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return await this.pizzaModel.find().skip(offset).limit(limit).exec();
  }

  async findOne(id: string) {
    const pizza = await this.pizzaModel.findById(id).exec();

    if (!pizza) {
      throw new NotFoundException(`Pizza #${id} not found.`);
    }

    return pizza;
  }

  async create(createPizzaDto: CreatePizzaDto) {
    const pizza = new this.pizzaModel(createPizzaDto);
    return await pizza.save();
  }

  async update(id: string, updatePizzaDto: UpdatePizzaDto) {
    const existingPizza = await this.pizzaModel
      .findByIdAndUpdate(id, { $set: updatePizzaDto }, { new: true })
      .exec();

    if (!existingPizza) {
      throw new NotFoundException(`Pizza #${id} not found.`);
    }

    return existingPizza;
  }

  async delete(id: string) {
    return await this.pizzaModel.findByIdAndDelete(id);
  }

  async recommend(id: string) {
    const pizza = await this.findOne(id);

    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      pizza.recommendations++;

      const recommendEvent = new this.eventModel({
        type: 'pizza',
        name: 'recommend_pizza',
        payload: { pizzaId: pizza.id },
      });

      await recommendEvent.save();
      await pizza.save();

      await session.commitTransaction();
    } catch (err) {
      await session.abortTransaction();
    } finally {
      session.endSession();
    }
  }
}
