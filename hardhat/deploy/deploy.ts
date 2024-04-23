const hre = require("hardhat");

async function main() {
  const favTokens = await hre.ethers.deployContract("FavouriteTokens");

  await favTokens.waitForDeployment();

  console.log(`contract is deployed to ${favTokens.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
