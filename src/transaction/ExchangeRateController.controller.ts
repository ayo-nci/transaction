import { Controller, Inject } from '@nestjs/common';
import { ExchangeRateService } from './ExchangeRateService.service';

@Controller()
export class ExchangeRateController {
  constructor(
    @Inject(ExchangeRateService)
    private readonly exchangeRateService: ExchangeRateService,
  ) {
    setInterval(() => {
      this.exchangeRateService.postExchangeRates();
    }, 300000); // 5 minutes
  }
}
