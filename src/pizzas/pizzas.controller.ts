import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { CreatePizzaDto } from './dto/create-pizza.dto';
import { UpdatePizzaDto } from './dto/update-pizza.dto';
import { PizzasService } from './pizzas.service';

@Controller('pizzas')
export class PizzasController {
  constructor(private readonly pizzasService: PizzasService) {}

  @Get()
  findAll() {
    return this.pizzasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pizzasService.findOne(id);
  }

  @Post()
  create(@Body() createPizzaDto: CreatePizzaDto) {
    return this.pizzasService.create(createPizzaDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePizzaDto: UpdatePizzaDto) {
    return this.pizzasService.update(id, updatePizzaDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    this.pizzasService.delete(id);
  }
}
