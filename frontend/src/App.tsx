import React, { useState, useEffect } from "react";
import "./App.css";
import TokenListComponent from "./Components/TokenList/TokenListComponent";
import AvailableToken from "./Interfaces/AvailableTokenInterface";
import ErrorComponent from "./Components/ErrorComponent/ErrorComponent";
import { API_URL } from "./config";
import { ethers } from "ethers";
import { contractAbi, contractAddress } from "./Constant/Constants";

function App() {
  const [availableTokens, setAvailableTokens] = useState<AvailableToken[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [favouriteTokens, setFavouriteTokens] = useState<string[] | null>(null);

  async function getFavouriteTokensFromContract() {
    try {
      if (!window.ethereum) {
        throw new Error("MetaMask not detected");
      }

      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contractInstance = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );

      const favTokens = await contractInstance.getFavouriteTokens();

      setFavouriteTokens(favTokens);
    } catch (error) {
      console.error("Error getting favourite tokens:", error);
    }
  }

  async function connectMetamask() {
    if (!window.ethereum) {
      console.error("Metamask is not detected in the browser");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(provider);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);
      console.log("Metamask Conected: " + address);
      setIsConnected(true);
      getFavouriteTokensFromContract();
    } catch (err) {
      console.error(err);
    }
  }

  async function setFavouriteToken(token: string) {
    if (!window.ethereum) {
      console.error("MetaMask not detected");
      return;
    }
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const contractInstance = new ethers.Contract(
      contractAddress,
      contractAbi,
      signer
    );
    const tx = await contractInstance.setFavouriteToken(token);
    await tx.wait();
    getFavouriteTokensFromContract();
  }

  async function deleteFavouriteToken(token: string) {
    if (!window.ethereum) {
      console.error("MetaMask not detected");
      return;
    }
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const contractInstance = new ethers.Contract(
      contractAddress,
      contractAbi,
      signer
    );
    const tx = await contractInstance.deleteFavouriteToken(token);
    await tx.wait();
    getFavouriteTokensFromContract();
  }

  async function handleAccountChange(accounts: any) {
    if (accounts.length > 0 && account !== accounts[0]) {
      setAccount(accounts[0]);
      getFavouriteTokensFromContract();
    } else {
      setIsConnected(false);
      setAccount(null);
    }
  }

  // Function to fetch available tokens
  const fetchAvailableTokens = async () => {
    try {
      setLoading(true);

      const response = await fetch(API_URL + "/tokens");
      const data: AvailableToken[] = await response.json();

      setAvailableTokens(data);
      setLoading(false);
      return data;
    } catch (error) {
      console.error("Error fetching tokens:", error);
      setLoading(false);
      setError("Error fetching tokens: " + error);
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountChange);
    }
    fetchAvailableTokens();
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", handleAccountChange);
      }
    };
  }, []);
  return (
    <div>
      <header className="bg-blue-500 text-white text-2xl text-center font-bold p-4">
        CryptoPriceChecker
      </header>
      <p className="text-center bg-gray-400">Powered by CoinMarketCap</p>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <div className="flex flex-row-reverse mt-8 mr-14">
          {isConnected ? (
            <div className="flex flex-col items-center bg-transparent text-blue-500 font-semibold py-1 px-2 border border-blue-500 rounded">
              <p className="text-blue-500">Welcome!</p>
              <p className="text-blue-500">{account}</p>
            </div>
          ) : (
            <button
              onClick={connectMetamask}
              className="bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
              Connect to MetaMask
            </button>
          )}
        </div>

        {loading ? (
          <div
            data-testid="spinner"
            className="flex justify-center items-start pt-14 h-screen"
          >
            <img src="./tube-spinner.svg" className="w-12 h-12" />
          </div>
        ) : error ? (
          <ErrorComponent error={error} />
        ) : (
          <TokenListComponent
            availableTokens={availableTokens}
            favouriteTokens={favouriteTokens}
            isConnected={isConnected}
            setFavToken={setFavouriteToken}
            deleteFavouriteToken={deleteFavouriteToken}
          />
        )}
      </div>
    </div>
  );
}

export default App;
