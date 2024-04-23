# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/FavouriteToken.ts
```

Use the test command to run the test suite

Use the ignition deploy to deploy it to the blockchain(Make sure its a test network like sepolia!)

To use the contract in the frontend(in case you want to do it yourself):
- Run the deploy command
- Copy the smart contract address & paste it in /frontend/Constant/Constants.ts in the appropiate variable
- Copy the ABI(/artifacts/contracts/FavouriteTokens.sol/FavouriteTokens.json) & paste it in the same Constants.ts file under the appropiate variable