import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Token } from "../entity/Token";

export class TokenController {

    private tokenRepository = AppDataSource.getRepository(Token);

    async all() {
        try {
            return this.tokenRepository.find();
        } catch(error) {
            console.error("Error fetching all tokens:", error);
            return { error: "Failed to fetch tokens" };
        }
    };

    async one(request: Request) {
        try{
            const symbol = request.params.symbol;
            const token = await this.tokenRepository.findOne({
                where: { symbol }
            });
            if (!token) {
                return {error: "Unregistered symbol, cannot fetch"};
            };
            return token;
        } catch(error) {
            console.error("Error fetching token:", error);
            return { error: "Failed to fetch token" };
        }
    }

    async save(request: Request) {
        try {
            const { tokenId, name, symbol } = request.body;
            const token = Object.assign(new Token(), {
                tokenId,
                name,
                symbol
            });

            this.tokenRepository.save(token);

            return token;
        } catch(error) {
            console.error("Error saving token:", error);
            return { error: "Failed to save token" };
        };
    }

    async remove(request: Request) {
        try {
            const tokenId = Number(request.params.tokenId);
            let tokenToRemove = await this.tokenRepository.findOneBy({ tokenId });
            if (!tokenToRemove) {
                return {error: "The token provided does not exist in the DB"};
            };

            await this.tokenRepository.remove(tokenToRemove);

            return "Token has been removed";
        } catch(error) {
            console.error("Error removing token:", error);
            return { error: "Failed to remove token" };
        };
    };

}