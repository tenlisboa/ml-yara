import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateRuleUseCase } from "./CreateRuleUseCase";

class CreateRuleController {
  async handle(request: Request, response: Response) {
    const { name, rule } = request.body;

    const createRuleUseCase = container.resolve(CreateRuleUseCase);
    const newRule = await createRuleUseCase.execute({
      name,
      ruleString: rule,
    });

    return response.status(201).json({
      id: newRule.id,
      name: newRule.name,
      rule: newRule.ruleString,
    });
  }
}

export { CreateRuleController };
