import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
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
  create(@Body() body: any) {
    return this.pizzasService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.pizzasService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    this.pizzasService.delete(id);
  }
}
