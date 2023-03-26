import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PizzasModule } from './pizzas/pizzas.module';
import { PizzaRatingModule } from './pizza-rating/pizza-rating.module';

@Module({
  imports: [
    PizzasModule,
    MongooseModule.forRoot(
      'mongo_db_conncetion',
    ),
    PizzaRatingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
