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

AppDataSource.initialize().then(async () => {
  try {
    await yara.initializeAsync();

    console.log("Yara listening");
  } catch (err) {
    console.error("Yara error: ", err);
  }

  const app = express();

  app.use(express.json());

  app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

  app.use(router);

  app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
      if (err instanceof AppError) {
        return response.status(err.statusCode).json({
          error: true,
          message: err.message,
        });
      }

      return response.status(500).json({
        error: true,
        message: "Internal server error",
      });
    }
  );

  app.listen(3333, () => {
    console.log("Server is running");
  });
});
