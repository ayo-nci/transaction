import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TransactionDocument } from './interfaces/transaction.interface';
import { Model } from 'mongoose';
import { CreateTransactionDTO } from './dto/createtransaction.dto';
import { endOfDay, startOfDay, parseISO, format } from 'date-fns';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel('Transaction')
    private transactionModel: Model<TransactionDocument>,
  ) {}
  //Fetch all transaction history
  /* async getAllHistory(): Promise<TransactionDocument[]> {
    const transactionHistory = await this.transactionModel
      .find()
      .skip(10 * (2 - 1))
      .limit(10)
      .exec();
    return await transactionHistory;
  } */

  async getAllHistory(
    page: number,
    itemsPerPage: number,
  ): Promise<TransactionDocument[]> {
    const startIndex = (page - 1) * itemsPerPage;
    const transactionHistory = await this.transactionModel
      .find()
      .skip(startIndex)
      .limit(itemsPerPage)
      .exec();
    return await transactionHistory;
  }

  //Fetch single transaction
  async getExchangeTransaction(id): Promise<TransactionDocument> {
    // console.log('service id is ' + id);
    const singleExchangeTransaction = await this.transactionModel
      .findById(id)
      .exec();
    return await singleExchangeTransaction;
  }

  //Filter history with date or from_currency or price type
  async getFilteredDate(datevalue: number): Promise<TransactionDocument[]> {
    // console.log('Received date in service is ' + datevalue);
    const startOfDay_ = startOfDay(datevalue);
    const endOfDay_ = endOfDay(datevalue);
    console.log('' + startOfDay_ + ':' + endOfDay_);
    const dateFilteredTransactionHistory = await this.transactionModel
      .find({ date: { $gte: startOfDay_, $lt: endOfDay_ } })
      //.find({ date:{$gte:ISODate(somedatevalue 2022-03-01),$lt:isModuleNamespaceObject(uptoanother)} })
      .exec();
    return dateFilteredTransactionHistory;
  }
  //Post an exchange transaction
  /*async addExchangeTransaction(
    createTransactionDTO: CreateTransactionDTO,
  ): Promise<TransactionDocument> {*/
  async addExchangeTransaction(
    createTransactionDTO: CreateTransactionDTO,
  ): Promise<TransactionDocument> {
    console.log(
      'createtransactionDTO in services is ' +
        JSON.stringify(createTransactionDTO),
    );
    const newExchangeTransaction = new this.transactionModel(
      createTransactionDTO,
    );
    return await newExchangeTransaction.save();
  }
}
