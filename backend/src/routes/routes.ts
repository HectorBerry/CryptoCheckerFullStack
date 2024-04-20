import { TokenController } from "../controller/TokenController"

// routes/example.ts
import express, { Request, Response } from 'express';
const MainAPIRouter = express.Router();

/**
 * @swagger
 * /tokens:
 *   get:
 *     summary: Get current prices from all the tokens available in the database
 *     description: Retrieve a list of all tokens with its prices.
 *     responses:
 *       200:
 *         description: Successful operation
 */
MainAPIRouter.get('/tokens', (req: Request, res: Response) => {
  // Your route logic here
});

/**
 * @swagger
 * /tokens/{tokenId}:
 *   get:
 *     summary: Get current price of a token by ID
 *     description: Retrieve a single token price by its ID.
 *     parameters:
 *       - in: path
 *         name: tokenId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful operation
 */
MainAPIRouter.get('/tokens/:tokenId', (req: Request, res: Response) => {
  // Your route logic here
});

/**
 * @swagger
 * /tokens/add:
 *   post:
 *     summary: Add a new token to the database for later use in the application.
 *     description: Add a new cryptocurrency
 *     responses:
 *       200:
 *         description: Successful operation
 *       400:
 *         description: Bad request
 */
MainAPIRouter.post('/tokens/add', (req: Request, res: Response) => {
    // Your route logic here
});

/**
 * @swagger
 * /tokens:
 *   delete:
 *     summary: Get current prices from all the tokens available in the database
 *     description: Retrieve a list of all tokens with its prices.
 *     responses:
 *       200:
 *         description: Successful operation
 */
MainAPIRouter.delete('/tokens/:tokenId', (req: Request, res: Response) => {
    // Your route logic here
});

// Add similar annotations for other routes

export default MainAPIRouter;