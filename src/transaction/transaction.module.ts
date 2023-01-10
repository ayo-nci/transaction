import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionSchema } from './schemas/transaction.schema';
import { ExchangeRateController } from './ExchangeRateController.controller';
import { ExchangeRateService } from './ExchangeRateService.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Transaction',
        schema: TransactionSchema,
        collection: 'transactions',
      },
    ]),
  ],
  providers: [TransactionService, ExchangeRateService],
  controllers: [TransactionController, ExchangeRateController],
})
export class TransactionModule {}
