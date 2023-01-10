import {
  Body,
  Controller,
  Res,
  Get,
  HttpStatus,
  Post,
  // Put,
  Query,
  NotFoundException,
  // Delete,
  Param,
  // ValidationPipe,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';

import { CreateTransactionDTO } from './dto/createtransaction.dto';

import { ExchangeRateService } from './ExchangeRateService.service';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  //add an exchange rate transaction
  @Post('/create')
  async addTransaction(
    @Res() res,
    //  @Body(new ValidationPipe({ transform: true }))
    // createtransactionDTO: CreateTransactionDTO,
    @Body() createTransactionDTO: CreateTransactionDTO,
  ) {
    /*  const Transaction = await this.transactionService.addExchangeTransaction(
      createtransactionDTO,
    );*/
    //const TransactionClient = CreateTransactionDTO.from(createtransactionDTO);
    console.log(
      'createtransactionDTO is ' + JSON.stringify(createTransactionDTO),
    );
    const Transaction = await this.transactionService.addExchangeTransaction(
      createTransactionDTO,
    );
    return res.status(HttpStatus.OK).json({
      message: 'Transaction has been created successfully',
      Transaction,
    });
  }
  //Retrive exchange rate transaction list
  /*@Get('/')
  async getAllTransactions(@Res() res) {
    const allTransactions = await this.transactionService.getAllHistory();
    return res.status(HttpStatus.OK).json(allTransactions);
  }*/
  @Get('/')
  async getAllTransactions(
    @Res() res,
    @Query('page') page: number,
    @Query('itemsPerPage') itemsPerPage: number,
  ) {
    const allTransactions = await this.transactionService.getAllHistory(
      page,
      itemsPerPage,
    );
    return res.status(HttpStatus.OK).json(allTransactions);
  }

  //Retrieve single exchange rate transaction by ID
  @Get()
  async getTransaction(@Res() res, @Query('id') id?: string) {
    const transaction = await this.transactionService.getExchangeTransaction(
      id,
    );
    //console.log(id + ':' + transaction);
    if (!transaction)
      throw new NotFoundException('Transaction does not exist!');
    return res.status(HttpStatus.OK).json(transaction);
  }
  //Filter transaction history by date
  @Post('/date')
  async filterByDate(@Res() res, @Body() date_: any) {
    console.log('Received object is ' + JSON.stringify(date_));
    console.log('Received date is ' + date_.date);
    const filteredDateHistory = await this.transactionService.getFilteredDate(
      new Date(date_.date).getTime(),
    );
    console.log('FDH is ' + filteredDateHistory);
    //console.log(id + ':' + transaction);
    if (!filteredDateHistory)
      throw new NotFoundException('Date does not exist!');
    return res.status(HttpStatus.OK).json(filteredDateHistory);
  }
}
