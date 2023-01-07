import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TransactionDocument } from './interfaces/transaction.interface';
import { Model } from 'mongoose';
import { CreateTransactionDTO } from './dto/createtransaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel('Transaction')
    private transactionModel: Model<TransactionDocument>,
  ) {}
  //Fetch all transaction history
  async getAllHistory(): Promise<TransactionDocument[]> {
    const transactionHistory = await this.transactionModel.find().exec();
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
  async getFilteredHistory(someProp: any): Promise<TransactionDocument[]> {
    //const propKey = someProp[0];
    const propValue = someProp[1];
    // const filteredtransactionhistory = await this.transactionModel.findby(someProp).exec();
    const filteredTransactionHistory = await this.transactionModel
      .find({ from_currency: propValue })
      .exec();
    return filteredTransactionHistory;
  }
  //Post an exchange transaction
  /*async addExchangeTransaction(
    createTransactionDTO: CreateTransactionDTO,
  ): Promise<TransactionDocument> {*/
  async addExchangeTransaction(
    createTransactionDTO: CreateTransactionDTO,
  ): Promise<TransactionDocument> {
    const newExchangeTransaction = new this.transactionModel(
      createTransactionDTO,
    );
    return await newExchangeTransaction.save();
  }
  //Delete an exchange transaction
  async deleteExchangeTransaction(transactionID): Promise<TransactionDocument> {
    const delExchangeTransaction =
      await this.transactionModel.findByIdAndRemove(transactionID);
    return delExchangeTransaction;
  }
}
