import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PizzasModule } from './pizzas/pizzas.module';

@Module({
  imports: [
    PizzasModule,
    MongooseModule.forRoot(
      'mongo_db_conncetion',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
