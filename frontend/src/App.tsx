import React, { useState, useEffect } from 'react';
import './App.css';
import TokenListComponent from './Components/TokenList/TokenListComponent';
import AvailableToken from './Interfaces/AvailableTokenInterface';
import ErrorComponent from './Components/ErrorComponent/ErrorComponent';
import { API_URL } from './config';
import {ethers} from "ethers";

function App() {
  const [availableTokens, setAvailableTokens] = useState<AvailableToken[]>([]);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null)
  const [account, setAccount] = useState<string | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  async function connectMetamask() {
    if(window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum)
        setProvider(provider)
        await provider.send("eth_requestAccounts", [])
        const signer = await provider.getSigner()
        const address = await signer.getAddress()
        setAccount(address)
        console.log("Metamask Conected: " + address)
        setIsConnected(true)
      } catch(err) {
        console.error(err)
      }
    } else {
      console.error("Metamask is not detected in the browser")
    }
  }

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
        {isConnected? <p>{account}</p>:<div className='flex flex-row-reverse mt-8 mr-14'>
          <button onClick={connectMetamask} className='bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>Connect to MetaMask</button>
        </div>}
        
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
