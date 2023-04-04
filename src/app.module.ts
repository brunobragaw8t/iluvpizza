import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PizzasModule } from './pizzas/pizzas.module';
import { PizzaRatingModule } from './pizza-rating/pizza-rating.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        MONGO_DB_CONNECTION: Joi.required(),
      }),
    }),
    MongooseModule.forRoot(process.env.MONGO_DB_CONNECTION),
    PizzasModule,
    PizzaRatingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
