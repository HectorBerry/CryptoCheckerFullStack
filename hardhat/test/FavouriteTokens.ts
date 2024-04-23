import { expect } from "chai";
import hre from "hardhat";

describe("FavouriteTokens", function () {
  let FavouriteTokens;
  let favouriteTokens: any;
  let owner;
  let addr1: any;

  beforeEach(async function () {
    FavouriteTokens = await hre.ethers.getContractFactory("FavouriteTokens");
    [owner, addr1] = await hre.ethers.getSigners();

    favouriteTokens = await FavouriteTokens.deploy();
  });

  it("should set favourite token", async function () {
    await favouriteTokens.connect(addr1).setFavouriteToken("ETH");
    const tokens = await favouriteTokens.connect(addr1).getFavouriteTokens();
    expect(tokens).to.eql(["ETH"]); // Fixing the assertion to expect ["ETH"]
  });

  it("should return favourite tokens", async function () {
    await favouriteTokens.connect(addr1).setFavouriteToken("BTC");
    await favouriteTokens.connect(addr1).setFavouriteToken("ETH");

    const tokens = await favouriteTokens.connect(addr1).getFavouriteTokens();
    expect(tokens).to.eql(["BTC", "ETH"]); // Fixing the assertion to expect ["BTC", "ETH"]
  });

  it("should return empty array if no favourite tokens set", async function () {
    const tokens = await favouriteTokens.getFavouriteTokens();
    expect(tokens).to.eql([]);
  });
});