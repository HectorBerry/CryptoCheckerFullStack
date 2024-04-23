// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

contract FavouriteTokens {
    mapping(address => string[]) private favouriteTokens;

    function setFavouriteToken(string memory token) external {
        favouriteTokens[msg.sender].push(token);
    }

    function getFavouriteTokens() external view returns (string[] memory) {
        return favouriteTokens[msg.sender];
    }
}