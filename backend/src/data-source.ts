import "reflect-metadata";
import { DataSource } from "typeorm";
import { Token } from "./entity/Token";
import { configDotenv } from "dotenv";

// Load environment variables from .env file
configDotenv();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [Token],
  migrations: [],
  subscribers: [],
});
