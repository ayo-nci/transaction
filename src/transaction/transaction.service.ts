import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TransactionDocument } from './interfaces/transaction.interface';
import { Model } from 'mongoose';
import { CreateTransactionDTO } from './dto/createtransaction.dto';
import { endOfDay, startOfDay } from 'date-fns';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel('Transaction')
    private transactionModel: Model<TransactionDocument>,
  ) {}

  async getAllHistory(
    page: number,
    itemsPerPage: number,
  ): Promise<TransactionDocument[]> {
    const startIndex = (page - 1) * itemsPerPage;
    const transactionHistory = await this.transactionModel
      .find()
      .skip(startIndex)
      .limit(itemsPerPage)
      .sort({ date: -1 })
      .exec();
    return await transactionHistory;
  }

  //Fetch single transaction
  async getExchangeTransaction(id): Promise<TransactionDocument> {
    const singleExchangeTransaction = await this.transactionModel
      .findById(id)
      .exec();
    return await singleExchangeTransaction;
  }

  //Filter history with date or from_currency or price type
  async getFilteredDate(datevalue: number): Promise<TransactionDocument[]> {
    const startOfDay_ = startOfDay(datevalue);
    const endOfDay_ = endOfDay(datevalue);
    //console.log('' + startOfDay_ + ':' + endOfDay_);
    const dateFilteredTransactionHistory = await this.transactionModel
      .find({ date: { $gte: startOfDay_, $lt: endOfDay_ } })
      .sort({ date: -1 })
      .exec();
    return dateFilteredTransactionHistory;
  }
  async addExchangeTransaction(
    createTransactionDTO: CreateTransactionDTO,
  ): Promise<TransactionDocument> {
    const newExchangeTransaction = new this.transactionModel(
      createTransactionDTO,
    );
    return await newExchangeTransaction.save();
  }
}
