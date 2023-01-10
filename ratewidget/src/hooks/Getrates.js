import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetRates = () => {
  const [interval, setInterval] = useState(10000); // default interval of 10 seconds
  const [assetIdBase, setAssetIdBase] = useState('USD');
  const [assetIdQuote, setAssetIdQuote] = useState('EUR');
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const fetchData = async () => {
      const exchangeRateResponse = await axios.get(`/v1/exchangerate/${assetIdBase}/${assetIdQuote}?time=${time}`);
      await axios.post('http://localhost:5000/transaction/create', exchangeRateResponse.data);
    };

    const intervalId = setInterval(fetchData, interval);
    return () => clearInterval(intervalId);
  }, [interval, assetIdBase, assetIdQuote, time]);

  const handleIntervalChange = (event) => {
    setInterval(event.target.value);
  };

  return (
    <div>
      <input type="text" value={interval} onChange={handleIntervalChange} />
      <input type="text" value={assetIdBase} onChange={(event) => setAssetIdBase(event.target.value)} />
      <input type="text" value={assetIdQuote} onChange={(event) => setAssetIdQuote(event.target.value)} />
      <input type="text" value={time} onChange={(event) => setTime(event.target.value)} />
    </div>
  );
};

export default GetRates;
