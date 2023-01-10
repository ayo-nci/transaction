import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://ayoola:passayoola@cluster0.7haf8o0.mongodb.net/transactions?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
      },
    ),
    TransactionModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
