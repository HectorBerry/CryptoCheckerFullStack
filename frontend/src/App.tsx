import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import TokenListComponent from './Components/TokenList/TokenListComponent';
import AvailableToken from './Interfaces/AvailableTokenInterface';
import ErrorComponent from './Components/ErrorComponent/ErrorComponent';
import { API_URL } from './config';

function App() {
  const [availableTokens, setAvailableTokens] = useState<AvailableToken[]>([]);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null);

  // Function to fetch available tokens
  const fetchAvailableTokens = async () => {
    try {
      setLoading(true)

      const response = await fetch(API_URL + '/tokens');
      const data: AvailableToken[] = await response.json();

      setAvailableTokens(data)
      setLoading(false)
      return data
    } catch (error) {
      console.error('Error fetching tokens:', error);
      setLoading(false)
      setError('Error fetching tokens: ' + error);
    }
  };

  useEffect(() => {
    fetchAvailableTokens();
  }, []);
  return (
    <div>
      <header className="bg-blue-500 text-white text-2xl text-center font-bold p-4">
        CryptoPriceChecker
      </header>
      <p className='text-center bg-gray-400'>Powered by CoinMarketCap</p>
      <div className="flex flex-col min-h-screen bg-gray-100">
        {loading ? (
          <div data-testid="spinner" className="flex justify-center items-start pt-14 h-screen">
            <img src='./tube-spinner.svg' className="w-12 h-12" />
          </div>
        ) : error ? (
          <ErrorComponent error={error} />
        ) : (
          <TokenListComponent availableTokens={availableTokens} />
        )}
      </div>
    </div>
  );
}

export default App;
