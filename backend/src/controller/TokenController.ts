import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Token } from "../entity/Token"

export class TokenController {

    private tokenRepository = AppDataSource.getRepository(Token)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.tokenRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)


        const token = await this.tokenRepository.findOne({
            where: { id }
        })

        if (!token) {
            return "unregistered token, cannot fetch"
        }
        return token
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { tokenId, name } = request.body;

        const token = Object.assign(new Token(), {
            tokenId,
            name
        })

        return this.tokenRepository.save(token)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const tokenId = parseInt(request.params.tokenId)

        let tokenToRemove = await this.tokenRepository.findOneBy({ tokenId })

        if (!tokenToRemove) {
            return "this token does not exist"
        }

        await this.tokenRepository.remove(tokenToRemove)

        return "token has been removed"
    }

}