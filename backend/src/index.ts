import * as express from "express";
import * as bodyParser from "body-parser";
import { AppDataSource } from "./data-source";
import MainAPIRouter from "./routes/routes";
import specs from "./swagger";

const swaggerUi = require("swagger-ui-express");
const cors = require("cors");

AppDataSource.initialize()
  .then(async () => {
    // create express app
    const app = express();
    app.use(bodyParser.json());

    app.use(cors());

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

    app.use(MainAPIRouter);

    // app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

    // start express server
    app.listen(8888);

    console.log(
      "Express server has started on port 3000. Open http://localhost:3000/ to see results"
    );
  })
  .catch((error) => console.log(error));
