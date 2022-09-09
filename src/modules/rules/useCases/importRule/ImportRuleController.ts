import { Request, Response } from "express";
import { container } from "tsyringe";
import { ImportRuleUseCase } from "./ImportRuleUseCase";

class ImportRuleController {
  async handle(request: Request, response: Response) {
    const { file } = request;

    const importRuleUseCase = container.resolve(ImportRuleUseCase);

    await importRuleUseCase.execute(file!);

    return response.status(201).send();
  }
}

export { ImportRuleController };
