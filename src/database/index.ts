import { DataSource } from "typeorm";
import { Rule } from "../modules/rules/entities/Rule";
import { CreateRules1662203203498 } from "./migrations/1662203203498-CreateRules";

const AppDataSource = new DataSource({
  type: (process.env.DB_DRIVER as "postgres") || "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || "sample",
  password: process.env.DB_PASSWORD || "longpassword",
  database: process.env.DB_DATABASE || "ml_yara",
  entities: [Rule],
  migrations: [CreateRules1662203203498],
});

export { AppDataSource };
