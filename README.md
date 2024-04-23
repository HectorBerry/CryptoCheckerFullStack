# Crypto Currency Checker
This is a simple backend application built with Express.js, TypeORM, Swagger, React.js, Cypress and Hardhat

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (v14 or higher)
- npm (comes with Node.js)
- MySQL Database

### Installation

1. Clone the repository:

`git clone <repository-url>`

Navigate to the project directory

`cd my-app`

# Install dependencies:
Run the following command on the backend, frontend & hardhat folder:
`npm install`

# Config
Then add the appropiate .env files based on the example ones provided, and fill them with the correct parameters corresponding to your env

Make sure the smart contract is deployed, if not, go to the README.md under /hardhat and see how to deploy it

# Run
To run the project(dev mode) start the servers in the following order:
- /backend: npm run dev
- /frontend: npm start

To run the E2E tests from cypress run:
- /frontend: npm run cy:open