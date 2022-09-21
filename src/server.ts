import "dotenv/config";
import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import yara from "@automattic/yara";
import { router } from "./routes";
import swaggerUI from "swagger-ui-express";

import swaggerFile from "./swagger.json";
import { AppDataSource } from "./database";

import "./shared/container";
import { AppError } from "./errors/AppError";

export const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(
    express.static("tmp", {
      dotfiles: "deny",
    })
  );

  app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

  app.use("/api", router);

  app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
      if (err instanceof AppError) {
        return response.status(err.statusCode).json({
          status: "error",
          message: err.message,
        });
      }

      console.error(err);
      return response.status(500).json({
        status: "error",
        message: "Internal server error.",
      });
    }
  );

  return app;
};

export const initializeServer = async (dataSource = AppDataSource) => {
  await dataSource.initialize();

  try {
    await yara.initializeAsync();

    console.log("Yara listening");
  } catch (err) {
    console.error("Yara error: ", err);
  }

  return createApp();
};

if (process.env.NODE_ENV !== "testing") {
  process.env.APP_URL =
    process.env.NODE_ENV !== "production"
      ? "http://localhost:3333/"
      : process.env.APP_URL;

  initializeServer().then((app) => {
    app.listen(3333, () => {
      console.log("Server is running");
    });
  });
}
