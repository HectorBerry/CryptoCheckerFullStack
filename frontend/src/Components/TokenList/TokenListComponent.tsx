import React, { useState, useEffect } from 'react';
import TokenData from '../../Interfaces/TokenInterface';
import AvailableToken from '../../Interfaces/AvailableTokenInterface';
import ErrorComponent from '../ErrorComponent/ErrorComponent';
import { API_URL } from '../../config';

const TokenListComponent = ({ availableTokens }: { availableTokens: AvailableToken[] }) => {
  const [tokens, setTokens] = useState<TokenData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make API call to fetch token prices data
        let tokenSymbols = availableTokens.map(token => {
            return token["symbol"];
        })

        const requestBody = {
            symbol: tokenSymbols
        };
        
        const response = await fetch(API_URL + '/tokens/getPrice', {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
          });
        const data = await response.json();
        
        console.log(data)

        // Extract tokens items from the API response
        let keys = Object.keys(data)
        let tokenItems: TokenData[] = keys.map((key: any) => { 
            return {
            CMC_id: data[key].CMC_id,
            symbol: data[key].symbol,
            name: data[key].name,
            price: data[key].price
        }});


        setTokens(tokenItems);
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
        setError('Error fetching data:'+  error)
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
            <li className="mb-4 border rounded p-4 shadow-lg">
                <div className="grid grid-cols-3">
                    <div className='col-start-1 col-end-2'>NAME</div>
                    <div className='col-start-2 col-end-3 text-center'>SYMBOL</div>
                    <div className='col-start-3 col-end-4 flex flex-row-reverse'>PRICE (USD)</div>
                </div>
            </li>
            {error? <li>
                <ErrorComponent error={error}/>
            </li> :
            tokens.map((token, index) => (
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