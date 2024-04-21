import { TokenController } from "../controller/TokenController"
import { Request, Response, NextFunction, Router } from 'express';
import axios from "axios";

const MainAPIRouter = Router();
let controller: TokenController = new TokenController()

MainAPIRouter.get('/tokens', async (req: Request, res: Response, next: NextFunction) => {
    // Your route logic here
    try {
        const tokens = await controller.all(req, res); // Call the controller method
        res.status(200).json(tokens); // Send the response
    } catch (error) {
        next(error); // Pass any errors to the error handling middleware
    }
});

MainAPIRouter.get('/tokens/:tokenId', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const token = await controller.one(req, res); // Call the controller method
        res.status(200).json(token); // Send the response
    } catch (error) {
        next(error); // Pass any errors to the error handling middleware
    }
});

MainAPIRouter.post('/tokens/add', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const token = await controller.save(req, res); // Call the controller method
        res.status(200).json(token); // Send the response
    } catch (error) {
        next(error); // Pass any errors to the error handling middleware
    }
});

MainAPIRouter.delete('/tokens/:tokenId', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const token = await controller.remove(req, res); // Call the controller method
        res.status(200).json(token); // Send the response
    } catch (error) {
        next(error); // Pass any errors to the error handling middleware
    }
});

MainAPIRouter.post('/tokens/getPrice', async(req: Request, res: Response, next: NextFunction) => {
    try {
        const tokens: Array<Number> = req.body.tokens // Call the controller method
        const headers = {
            'X-CMC_PRO_API_KEY': 'Custom Value',
        };

        const response = await axios.get(' https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
            headers: headers
        });

        const data = response.data;
        

        res.json(data);
    } catch (error) {
        next(error); // Pass any errors to the error handling middleware
    }
});

export default MainAPIRouter;