const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const contractAbi = [
    {
      "inputs": [],
      "name": "getFavouriteTokens",
      "outputs": [
        {
          "internalType": "string[]",
          "name": "",
          "type": "string[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "token",
          "type": "string"
        }
      ],
      "name": "setFavouriteToken",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

export {contractAddress, contractAbi}