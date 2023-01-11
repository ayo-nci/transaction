import { Test, TestingModule } from '@nestjs/testing';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { CreateTransactionDTO } from './dto/createtransaction.dto';

describe('TransactionController', () => {
  let transactionController: TransactionController;
  let transactionService: TransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionController],
      providers: [TransactionService],
    }).compile();

    transactionController = module.get<TransactionController>(
      TransactionController,
    );
    transactionService = module.get<TransactionService>(TransactionService);
  });
  describe('addTransaction', () => {
    it('should return an ok status code with a message and the transaction', async () => {
      jest
        .spyOn(transactionService, 'addExchangeTransaction')
        .mockImplementation(() => Promise.resolve(CreateTransactionDTO));
      const result = await transactionController.addTransaction(
        {},
        CreateTransactionDTO,
      );
      expect(result.statusCode).toBe(200);
      expect(result.message).toBe('Transaction has been created successfully');
    });
  });

  describe('getAllTransactions', () => {
    it('should call service and return an array of transactions', async () => {
      jest.spyOn(transactionService, 'getAllHistory').mockImplementation(() =>
        Promise.resolve([
          {
            _id: '63b9e09b82334012e98984b8',
            from_currency: 'USD',
            from_amount: 2000,
            to_currency: 'BTC',
            to_amount: 200,
            date: '2022-06-30T23:00:00.000Z',
            price_type: 'live',
          },
          {
            _id: '63b9e41969e120a33d5a4c37',
            date: '2023-01-07T21:28:57.018Z',
            __v: 0,
          },
        ]),
      );
      const result = await transactionController.getAllTransactions({}, 1, 2);
      expect(transactionService.getAllHistory).toBeCalled();
      expect(result).toEqual([
        {
          _id: '63b9e09b82334012e98984b8',
          from_currency: 'USD',
          from_amount: 2000,
          to_currency: 'BTC',
          to_amount: 200,
          date: '2022-06-30T23:00:00.000Z',
          price_type: 'live',
        },
        {
          _id: '63b9e41969e120a33d5a4c37',
          date: '2023-01-07T21:28:57.018Z',
          __v: 0,
        },
      ]);
    });
  });

  describe('getTransaction', () => {
    it('should call service and return a transaction', async () => {
      jest
        .spyOn(transactionService, 'getExchangeTransaction')
        .mockImplementation(() =>
          Promise.resolve({
            _id: '63b9e09b82334012e98984b8',
            from_currency: 'USD',
            from_amount: 2000,
            to_currency: 'BTC',
            to_amount: 200,
            date: '2022-06-30T23:00:00.000Z',
            price_type: 'live',
          }),
        );
      const result = await transactionController.getTransaction({
        query: { id: '63b9e09b82334012e98984b8' },
      });
      expect(transactionService.getExchangeTransaction).toBeCalledWith(1);
      expect(result).toBe('transaction');
    });
  });

  describe('filterByDate', () => {
    it('should call service and return filtered transactions', async () => {
      jest
        .spyOn(transactionService, 'getFilteredDate')
        .mockImplementation(() => ['transaction1', 'transaction2']);
      const date = new Date();
      const result = await transactionController.filterByDate({
        body: { date },
      });
      expect(transactionService.getFilteredDate).toBeCalledWith(date);
      expect(result).toEqual(['transaction1', 'transaction2']);
    });
  });
});
