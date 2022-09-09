import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListRulesUseCase } from "./ListRulesUseCase";

class ListRulesController {
  async handle(request: Request, response: Response) {
    const createRulesUseCase = container.resolve(ListRulesUseCase);
    const rules = await createRulesUseCase.execute();

    return response.status(200).json(rules);
  }
}

export { ListRulesController };
