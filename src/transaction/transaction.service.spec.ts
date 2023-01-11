import { Test, TestingModule } from '@nestjs/testing';
import { TransactionService } from './transaction.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionSchema } from './schemas/transaction.schema';
import { TransactionDocument } from './interfaces/transaction.interface';
import { Model } from 'mongoose';
import { CreateTransactionDTO } from './dto/createtransaction.dto';

describe('TransactionService', () => {
  let service: TransactionService;
  let transactionModel: Model<TransactionDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forFeature([
          { name: 'Transaction', schema: TransactionSchema },
        ]),
      ],
      providers: [TransactionService],
    }).compile();

    service = module.get<TransactionService>(TransactionService);
    transactionModel = module.get<Model<TransactionDocument>>('Transaction');
  });

  describe('getAllHistory', () => {
    it('should return an array of transactions', async () => {
      const page = 1;
      const itemsPerPage = 10;
      const transactions = [
        {
          date: '2022-06-30T23:00:00.000Z',
          from_currency: 'USD',
          to_currency: 'BTC',
          from_amount: 2000,
          to_amount: 200,
          price_type: 'live',
        },
        {
          date: '2022-06-30T23:00:00.000Z',
          from_currency: 'USD',
          to_currency: 'BTC',
          from_amount: 2000,
          to_amount: 200,
          price_type: 'live',
        },
      ];
      jest.spyOn(transactionModel, 'find').mockReturnValue({
        skip: jest.fn().mockReturnValue({
          limit: jest.fn().mockReturnValue({
            exec: jest.fn().mockResolvedValue(transactions),
          }),
        }),
      });
      const result = await service.getAllHistory(page, itemsPerPage);
      expect(result).toEqual(transactions);
    });
  });

  describe('getExchangeTransaction', () => {
    it('should return a single transaction', async () => {
      const id = '63b9e09b82334012e98984b8';
      const transaction = {
        date: '2022-06-30T23:00:00.000Z',
        from_currency: 'USD',
        to_currency: 'BTC',
        from_amount: 2000,
        to_amount: 200,
        price_type: 'live',
      };
      jest.spyOn(transactionModel, 'findById').mockResolvedValue(transaction);
      const result = await service.getExchangeTransaction(id);
      expect(result).toEqual(transaction);
    });
  });

  describe('getFilteredDate', () => {
    it('should return an array of filtered transactions by date', async () => {
      const datevalue = new Date('2023-01-08T00:00:00.000Z').getTime();
      const transactions = [
        {
          date: '2023-01-08T03:31:48.280Z',
          from_currency: 'gbp',
          to_currency: 'ripple',
          from_amount: 3543,
          to_amount: 3443,
          price_type: 'approved',
        },
        {
          date: '2023-01-08T07:30:08.482Z',
          from_currency: 'ngn',
          to_currency: 'ripple',
          from_amount: 22,
          to_amount: 211,
          price_type: 'approved',
        },
      ];
      jest
        .spyOn(transactionModel, 'find')
        .mockReturnValue({ exec: jest.fn().mockResolvedValue(transactions) });
      const result = await service.getFilteredDate(datevalue);
      expect(result).toEqual(transactions);
    });
  });

  describe('addExchangeTransaction', () => {
    it('should insert a new transaction', async () => {
      const createTransactionDTO: CreateTransactionDTO = {
        date: new Date(),
        from_currency: 'BTC',
        to_currency: 'USD',
        price_type: 'Exchanged',
        from_amount: 1.2,
        to_amount: 1,
      };
      jest
        .spyOn(transactionModel, 'find')
        .mockReturnValue({ exec: jest.fn().mockResolvedValue(transactions) });
      const result = await service.addExchangeTransaction(createTransactionDTO);
      expect(result).toEqual(createTransactionDTO);
    });
  });
});
