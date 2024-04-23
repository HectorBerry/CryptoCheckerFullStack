const contractAddress = "0x2313B09d74B8B5490A6354faB63e5A27Cd1e62d7";
const contractAbi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "token",
        type: "string",
      },
    ],
    name: "deleteFavouriteToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getFavouriteTokens",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "token",
        type: "string",
      },
    ],
    name: "setFavouriteToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export { contractAddress, contractAbi };
