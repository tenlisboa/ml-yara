import { DataSource, DataSourceOptions } from "typeorm";
import { AnalyzedAsset } from "../modules/rules/entities/AnalyzedAsset";
import { Rule } from "../modules/rules/entities/Rule";
import { config } from "./envs";
import { CreateRules1662203203498 } from "./migrations/1662203203498-CreateRules";
import { CreateAnalyzedAssets1663764739053 } from "./migrations/1663764739053-CreateAnalyzedAssets";

const getConfig = (env: string): DataSourceOptions => {
  if (env !== "testing") {
    return config({
      entities: [Rule, AnalyzedAsset],
      migrations: [CreateRules1662203203498, CreateAnalyzedAssets1663764739053],
    })[env as keyof typeof config];
  }

  console.log("IS TESTING");

  return {
    type: "sqlite",
    database: "./src/e2e/database/database.sqlite",
    entities: [Rule, AnalyzedAsset],
    migrations: [CreateRules1662203203498, CreateAnalyzedAssets1663764739053],
  };
};

let ENV =
  process.env.NODE_ENV !== "testing" && process.env.NODE_ENV !== "production"
    ? "development"
    : process.env.NODE_ENV!;

const AppDataSource = new DataSource(getConfig(ENV));

export { AppDataSource };
