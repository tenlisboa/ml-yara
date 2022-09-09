import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateRuleUseCase } from "./CreateRuleUseCase";

class CreateRuleController {
  async handle(request: Request, response: Response) {
    const { name, rule } = request.body;

    const createRuleUseCase = container.resolve(CreateRuleUseCase);
    await createRuleUseCase.execute({ name, rule_string: rule });

    return response.status(200).send();
  }
}

export { CreateRuleController };
