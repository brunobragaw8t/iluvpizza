import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist';
import { Model } from 'mongoose';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CreatePizzaDto } from './dto/create-pizza.dto';
import { UpdatePizzaDto } from './dto/update-pizza.dto';
import { Pizza } from './entities/pizza.entity';

@Injectable()
export class PizzasService {
  constructor(
    @InjectModel(Pizza.name) private readonly pizzaModel: Model<Pizza>,
  ) {}

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
}
