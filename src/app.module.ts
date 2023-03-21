import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PizzasController } from './pizzas/pizzas.controller';
import { PizzasService } from './pizzas/pizzas.service';

@Module({
  imports: [],
  controllers: [AppController, PizzasController],
  providers: [AppService, PizzasService],
})
export class AppModule {}
