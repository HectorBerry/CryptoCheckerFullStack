import { TokenController } from "../controller/TokenController"

// routes/example.ts
import express, { Request, Response, NextFunction } from 'express';
const MainAPIRouter = express.Router();
let controller: TokenController

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
MainAPIRouter.get('/tokens', async (req: Request, res: Response, next: NextFunction) => {
    // Your route logic here
    try {
        const tokens = await controller.all(req, res); // Call the controller method
        res.json(tokens); // Send the response
    } catch (error) {
        next(error); // Pass any errors to the error handling middleware
    }
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
MainAPIRouter.get('/tokens/:tokenId', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const token = await controller.one(req, res); // Call the controller method
        res.json(token); // Send the response
    } catch (error) {
        next(error); // Pass any errors to the error handling middleware
    }
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
MainAPIRouter.post('/tokens/add', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const token = await controller.save(req, res); // Call the controller method
        res.json(token); // Send the response
    } catch (error) {
        next(error); // Pass any errors to the error handling middleware
    }
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
 *       400:
 *         description: Bad request
 */
MainAPIRouter.delete('/tokens/:tokenId', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const token = await controller.remove(req, res); // Call the controller method
        res.json(token); // Send the response
    } catch (error) {
        next(error); // Pass any errors to the error handling middleware
    }
});

// Add similar annotations for other routes

export default MainAPIRouter;