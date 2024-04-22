import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import TokenListComponent from './Components/TokenList/TokenListComponent';
import AvailableToken from './Interfaces/AvailableTokenInterface';
import { API_URL } from './config';

function App() {
  const [availableTokens, setAvailableTokens] = useState<AvailableToken[]>([]);

  // Function to fetch initial tokens
  const fetchAvailableTokens = async () => {
    try {
      const response = await fetch(API_URL + '/tokens');
      const data: AvailableToken[] = await response.json();
      setAvailableTokens(data)
      return data
    } catch (error) {
      console.error('Error fetching tokens:', error);
    }
  };

  // useEffect hook to fetch initial tokens and start interval
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
        <TokenListComponent availableTokens={availableTokens}/>
      </div>
    </div>
  );
}

export default App;
