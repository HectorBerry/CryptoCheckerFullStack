const hre = require("hardhat");

async function main() {

  const favTokens = await hre.ethers.deployContract("FavouriteTokens");

  await favTokens.waitForDeployment();

  console.log(`contract is deployed to ${favTokens.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});