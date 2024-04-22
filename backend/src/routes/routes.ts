import { TokenController } from "../controller/TokenController";
import { Request, Response, NextFunction, Router } from 'express';
import axios from "axios";
import tokenPriceJson from '../types/tokenPriceJson';
import { Token } from "../entity/Token";

const MainAPIRouter: Router = Router();
const controller: TokenController = new TokenController();
const CMC_API_KEY_HEADER: string = 'X-CMC_PRO_API_KEY';
const LATEST_QUOTES_CMC_ENDPOINT: string = 'https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest';
type TokenArrayOrError = Token[] | { error: string };
type TokenOrError = Token | { error: string };


function getQuotesFromJSON(data: object): tokenPriceJson {
    let newJson: tokenPriceJson = {};
    for (const key in data) {
        newJson[key] = {
            CMC_id: data[key][0].id,
            name: data[key][0].name,
            symbol: data[key][0].symbol,
            price: data[key][0].quote.USD.price,
        };
    };
    return newJson;
}

MainAPIRouter.get('/tokens', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tokens: TokenArrayOrError = await controller.all();
        res.status(200).json(tokens);
    } catch (error) {
        next(error);
    };
});

MainAPIRouter.get('/tokens/:tokenId', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const token: TokenOrError = await controller.one(req);
        res.status(200).json(token);
    } catch (error) {
        next(error);
    };
});

MainAPIRouter.post('/tokens/add', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const token = await controller.save(req);
        res.status(200).json(token);
    } catch (error) {
        next(error);
    };
});

MainAPIRouter.delete('/tokens/:tokenId', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const token = await controller.remove(req);
        res.status(200).json(token);
    } catch (error) {
        next(error);
    };
});

MainAPIRouter.post('/tokens/getPrice', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const tokens: Array<string> = req.body.symbol;
        const headers = {
            [CMC_API_KEY_HEADER]: process.env.CMC_API_KEY,
        };
        const params = {
            symbol: tokens.join(',')
        };

        const response = await axios.get(LATEST_QUOTES_CMC_ENDPOINT, {
            headers,
            params
        });

        let quotes: tokenPriceJson = getQuotesFromJSON(response.data.data);

        res.status(200).json(quotes);
    } catch (error) {
        next(error);
    };
});

MainAPIRouter.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

export default MainAPIRouter;