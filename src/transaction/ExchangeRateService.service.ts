import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ExchangeRateService {
  constructor() {
    setInterval(() => {
      this.postExchangeRates();
    }, 30000); // 5 minutes
  }

  async getExchangeRates() {
    // Call coinbase endpoint to get BTC-USD exchange rate
    const btcUsdResponse = await axios.get(
      'https://api.coinbase.com/v2/exchange-rates',
      {
        params: {
          currency: 'BTC',
          fiat: 'USD',
        },
      },
    );
    const btcUsdExchangeRate = btcUsdResponse.data.data.rates.USD;

    // Call the coinbase endpoint to get ETH-USD exchange rate
    const ethUsdResponse = await axios.get(
      'https://api.coinbase.com/v2/exchange-rates',
      {
        params: {
          currency: 'ETH',
          fiat: 'USD',
        },
      },
    );
    const ethUsdExchangeRate = ethUsdResponse.data.data.rates.USD;

    return { btcUsdExchangeRate, ethUsdExchangeRate };
  }

  async postExchangeRates() {
    // Get the exchange rates
    const exchangeRates = await this.getExchangeRates();

    for (const key in exchangeRates) {
      const payload = {
        from_currency: key.split('UsdExchangeRate')[0],
        from_amount: 1,
        to_currency: 'USD',
        to_amount: Math.round(exchangeRates[key] * 100) / 100,
        price_type: 'Live',
      };

      // Post the exchange rates to the specified endpoint
      await axios.post('http://localhost:5000/transaction/create', payload);
    }
  }
}
