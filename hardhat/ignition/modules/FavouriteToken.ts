const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const FavouriteTokenModule = buildModule("FavouriteTokenModule", (m: any) => {
  const favToken = m.contract("FavouriteTokens");

  return { favToken };
});

module.exports = FavouriteTokenModule;