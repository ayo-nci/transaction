import { useEffect, useState } from 'react';
import axios from 'axios';
import openSocket from 'socket.io-client';

const useRates = () => {
  const [rates, setRates] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get('/api/rates');
        setRates(response.data);
      } catch (err) {
        setError(err);
      }
    };

    const intervalId = setInterval(fetchRates, 60000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  useEffect(() => {
    const socket = openSocket('/');

    socket.on('rates', (newRates) => {
      setRates((prevRates) => [...prevRates, ...newRates]);
    });

    return () => socket.disconnect();
  }, []);

  return [rates, error];
};

export default useRates;
