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
    expect(tokens).to.eql(["ETH"]);
  });

  it("if token is there already, it should not set favourite token", async function () {
    const tokenString = "ETH";
    await favouriteTokens.connect(addr1).setFavouriteToken(tokenString);
    await expect(
      favouriteTokens.connect(addr1).setFavouriteToken(tokenString)
    ).to.be.revertedWith("Token already in favourites");
  });

  it("should return favourite tokens", async function () {
    await favouriteTokens.connect(addr1).setFavouriteToken("BTC");
    await favouriteTokens.connect(addr1).setFavouriteToken("ETH");

    const tokens = await favouriteTokens.connect(addr1).getFavouriteTokens();
    expect(tokens).to.eql(["BTC", "ETH"]);
  });

  it("if token is not in favourites, it should revert delete operation", async function () {
    await expect(
      favouriteTokens.connect(addr1).deleteFavouriteToken("NOTTHERE")
    ).to.be.revertedWith("Token is not in favourites");
  });

  it("should delete specified favourite token", async function () {
    const tokenString = "BTC";
    await favouriteTokens.connect(addr1).setFavouriteToken(tokenString);
    await favouriteTokens.connect(addr1).deleteFavouriteToken(tokenString);
    const tokens = await favouriteTokens.getFavouriteTokens();
    expect(tokens).to.eql([]);
  });

  it("should return empty array if no favourite tokens set", async function () {
    const tokens = await favouriteTokens.getFavouriteTokens();
    expect(tokens).to.eql([]);
  });
});
