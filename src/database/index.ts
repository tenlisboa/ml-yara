import { DataSource, DataSourceOptions } from "typeorm";
import { Rule } from "../modules/rules/entities/Rule";
import { config } from "./envs";
import { CreateRules1662203203498 } from "./migrations/1662203203498-CreateRules";

const getConfig = (env: string): DataSourceOptions => {
  if (env !== "testing") {
    return config({
      entities: [Rule],
      migrations: [CreateRules1662203203498],
    })[env as keyof typeof config];
  }

  console.log("IS TESTING");

  return {
    type: "sqlite",
    database: "./src/e2e/database/database.sqlite",
    entities: [Rule],
    migrations: [CreateRules1662203203498],
  };
};

let ENV =
  process.env.NODE_ENV !== "testing" && process.env.NODE_ENV !== "production"
    ? "development"
    : process.env.NODE_ENV!;

const AppDataSource = new DataSource(getConfig(ENV));

export { AppDataSource };
