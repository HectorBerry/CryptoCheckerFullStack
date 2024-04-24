import { TokenController } from "../controller/TokenController";
import { Request, Response, NextFunction, Router } from "express";
import axios from "axios";
import tokenPriceJson from "../types/tokenPriceJson";
import { Token } from "../entity/Token";

const MainAPIRouter: Router = Router();
const controller: TokenController = new TokenController();
const CMC_API_KEY_HEADER: string = "X-CMC_PRO_API_KEY";
const LATEST_QUOTES_CMC_ENDPOINT: string =
  "https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest";
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
  }
  return newJson;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Token:
 *      type: object
 *      required:
 *         tokenId
 *         name
 *         symbol
 *      properties:
 *         id:
 *             type: number
 *             description: Database ID
 *         tokenId:
 *             type: number
 *             description: Token ID identifier
 *         name:
 *             type: string
 *             description: Cryptocurrency name
 *         symbol:
 *             type: string
 *             description: Cryptocurrency abreviated name
 *      example:
 *         id: 1
 *         tokenId: 1
 *         name: Bitcoin
 *         symbol: BTC
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     TokenPriceJson:
 *       type: object
 *       properties:
 *         [symbol]:
 *           $ref: '#/components/schemas/TokenPriceJsonItem'
 *       example:
 *         BTC:
 *           name: Bitcoin
 *           symbol: BTC
 *           CMC_id: 1
 *           price: 66250.98
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     TokenPriceJsonItem:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the token.
 *         symbol:
 *           type: string
 *           description: The symbol of the token.
 *         CMC_id:
 *           type: number
 *           format: integer
 *           description: The CoinMarketCap ID of the token.
 *         price:
 *           type: number
 *           format: float
 *           description: The price of the token.
 *       example:
 *         name: Bitcoin
 *         symbol: BTC
 *         CMC_id: 1
 *         price: 66250.98
 */

/**
 * @swagger
 * /tokens:
 *   get:
 *     summary: Get all tokens
 *     responses:
 *       200:
 *         description: Array of tokens or error message
 */
MainAPIRouter.get(
  "/tokens",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tokens: TokenArrayOrError = await controller.all();
      res.status(200).json(tokens);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * /tokens/{tokenId}:
 *   get:
 *     summary: Get a token by ID
 *     parameters:
 *       - in: path
 *         name: tokenId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the token to get
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Token not found
 */
MainAPIRouter.get(
  "/tokens/:tokenId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token: TokenOrError = await controller.one(req);
      if (!token) {
        res.sendStatus(404);
      }
      res.status(200).json(token);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * /tokens/add:
 *   post:
 *     summary: Add a new token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Token'
 *     responses:
 *       200:
 *         description: New token object or error message
 */
MainAPIRouter.post(
  "/tokens/add",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.body.tokenId || !req.body.name || !req.body.symbol) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
      const token = await controller.save(req);
      res.status(200).json(token);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * /tokens/{tokenId}:
 *   delete:
 *     summary: Delete a token by ID
 *     parameters:
 *       - in: path
 *         name: tokenId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the token to delete
 *     responses:
 *       200:
 *         description: Success message or error message
 */
MainAPIRouter.delete(
  "/tokens/:tokenId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = await controller.remove(req);
      res.status(200).json(token);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * /tokens/getPrice:
 *   post:
 *     summary: Get prices for tokens from CoinMarketCap API
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               symbol:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Prices of tokens or error message
 */
MainAPIRouter.post(
  "/tokens/getPrice",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.body.symbol) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
      const tokens: Array<string> = req.body.symbol;
      const headers = {
        [CMC_API_KEY_HEADER]: process.env.CMC_API_KEY,
      };
      const params = {
        symbol: tokens.join(","),
      };

      const response = await axios.get(LATEST_QUOTES_CMC_ENDPOINT, {
        headers,
        params,
      });

      let quotes: tokenPriceJson = getQuotesFromJSON(response.data.data);

      res.status(200).json(quotes);
    } catch (error) {
      next(error);
    }
  }
);

MainAPIRouter.use(
  (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
  }
);

export default MainAPIRouter;
