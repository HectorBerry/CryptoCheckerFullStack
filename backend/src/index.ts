import * as express from "express"
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import swaggerUi from 'swagger-ui-express';
import specs from './swagger';
import MainAPIRouter from "./routes/routes"
import { Token } from "./entity/Token"

AppDataSource.initialize().then(async () => {

    // create express app
    const app = express()
    app.use(bodyParser.json())

    app.use(MainAPIRouter);

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


    // setup express app here
    // ...

    // start express server
    app.listen(3000)

    // insert new users for test
    await AppDataSource.manager.save(
        AppDataSource.manager.create(Token, {
            tokenId: 1,
            name: "Bitcoin"
        })
    )

    await AppDataSource.manager.save(
        AppDataSource.manager.create(Token, {
            tokenId: 2,
            name: "Ethereum"
        })
    )
    

    console.log("Express server has started on port 3000. Open http://localhost:3000/ to see results")

}).catch(error => console.log(error))
