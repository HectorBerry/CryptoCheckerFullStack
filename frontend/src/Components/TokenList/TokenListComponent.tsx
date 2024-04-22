import React, { useState, useEffect } from 'react';
import TokenData from '../../Interfaces/TokenInterface';
import AvailableToken from '../../Interfaces/AvailableTokenInterface';
import { API_URL } from '../../config';

const TokenListComponent = ({ availableTokens }: { availableTokens: AvailableToken[] }) => {
  const [tokens, setTokens] = useState<TokenData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make API call to fetch token prices data
        const response = await fetch(API_URL + 'YOUR_API_ENDPOINT');
        const data = await response.json();
        // Extract tokens items from the API response
        const tokenItems = data.tokens.map((token: TokenData) => ({
            CMC_id: token.CMC_id,
            symbol: token.symbol,
            name: token.name,
            price: token.price
        }));

        
      } catch (error) {
        const testTokens: TokenData[] = [
            {
              CMC_id: 1,
              name: 'Bitcoin',
              symbol: 'BTC',
              price: 60000,
            },
            {
              CMC_id: 2,
              name: 'Ethereum',
              symbol: 'ETH',
              price: 2000,
            },
            {
              CMC_id: 3,
              name: 'Binance Coin',
              symbol: 'BNB',
              price: 500,
            },
          ];
        
        setTokens(testTokens);
        console.error('Error fetching data:', error);
      }
    };

    // Fetch data initially when the component mounts
    fetchData();

    // Fetch data every 60 seconds
    const intervalId = setInterval(fetchData, 60000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures that this effect runs only once on component mount

  return (
    <div className="grid grid-cols-6 gap-4 p-5">
      <div className="col-span-1"></div> {/* Empty column */}
      <div className="col-start-2 col-span-4">
        <div className="pt-5">
          <h1 className="text-2xl font-bold text-center mb-4">Current Prices</h1>
          <ul>
            {tokens.map((token, index) => (
              <li key={index} className="mb-4 border rounded p-4 shadow-lg">
                <div className="grid grid-cols-3">
                  <div className='col-start-1 col-end-2'>{token.name}</div>
                  <div className='col-start-2 col-end-3 text-center'>{token.symbol}</div>
                  <div className='col-start-3 col-end-4 flex flex-row-reverse'>{token.price.toString()} $</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="col-end-7 col-span-1"></div> {/* Empty column */}

    </div>
  );
};

export default TokenListComponent;