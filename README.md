# Crypto Currency Checker
This is a simple backend application built with Express.js, TypeORM, Swagger, React.js, Cypress and Hardhat

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (v14 or higher)
- npm (comes with Node.js)
- MySQL Database

!!IMPORTANT!! The MYSQL DB should be set up!!, you should have ready the user, password, database name and connection(hostname&port)

### Installation

1. Clone the repository:

`git clone <repository-url>`

Navigate to the project directory

`cd my-app`

# Install dependencies:
Run the following command on the backend, frontend & hardhat folder:
`npm install`

# Config
Config variables are managed with .env files, there are 2 of them, one under /backend and another under /hardhat .Add the appropiate .env files based on the example ones provided, and fill them with the correct parameters corresponding to your env.

The network where the smart contract is deployed is Sepolia, so remember to set up MetaMask to use it(Settings->Advanced->Show test networks)

The smart contract is deployed, but in case for somewhat reason the address no longer works, go to the README.md under /hardhat and see how to deploy it:
- Once the smart contract is deployed(or you have already the address), remember to paste the address and ABI in /frontend/src/Constant/Constants.ts under the appropiate constant variables.

To use the smart contract functionality you will need the MetaMask extension in your browser and an account with some test tokens, the network set up for this project is Sepolia, but feel free to change it to another if you need it.

# Run
To run the project(dev mode) start the servers in the following order:
- /backend: npm run dev
- /frontend: npm start

To run the E2E tests from cypress run:
- /frontend: npm run cy:open

# Notes
There are some icons for some cryptocurrencies, to see them you will need to add to the DB the next cryptos:
- Bitcoin
- Ethereum
- Dogecoin
- Litecoin

For the cryptos without icon the default fallback is the Bitcoin icon