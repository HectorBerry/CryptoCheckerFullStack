// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

contract FavouriteTokens {
    mapping(address => string[]) private favouriteTokens;

    function setFavouriteToken(string memory token) external {
        require(!tokenExists(msg.sender, token), "Token already in favourites");
        favouriteTokens[msg.sender].push(token);
    }

    function deleteFavouriteToken(string memory token) external {
        require(tokenExists(msg.sender, token), "Token is not in favourites");
        
        string[] storage tokens = favouriteTokens[msg.sender];
        for (uint256 i = 0; i < tokens.length; i++) {
            if (keccak256(abi.encodePacked(tokens[i])) == keccak256(abi.encodePacked(token))) {
                // Remove the token from the array
                if (i < tokens.length - 1) {
                    tokens[i] = tokens[tokens.length - 1];
                }
                tokens.pop();
                break;
            }
        }
    }

    function getFavouriteTokens() external view returns (string[] memory) {
        return favouriteTokens[msg.sender];
    }

    function tokenExists(address user, string memory token) internal view returns (bool) {
        string[] storage tokens = favouriteTokens[user];
        for (uint256 i = 0; i < tokens.length; i++) {
            if (keccak256(abi.encodePacked(tokens[i])) == keccak256(abi.encodePacked(token))) {
                return true;
            }
        }
        return false;
    }
}