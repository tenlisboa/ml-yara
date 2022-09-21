import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { Rule } from "../../entities/Rule";
import { IRulesRepository } from "../../repositories/IRulesRepository";

interface IRequest {
  name: string;
  ruleString: string;
}

@injectable()
class CreateRuleUseCase {
  constructor(
    @inject("RulesRepository")
    private rulesRepository: IRulesRepository
  ) {}

  async execute({ name, ruleString }: IRequest): Promise<Rule> {
    const ruleAlreadyExists = await this.rulesRepository.findByName(name);

    if (ruleAlreadyExists) {
      throw new AppError("Rule Already exists!", 422);
    }

    return await this.rulesRepository.create({ name, ruleString });
  }
}

export { CreateRuleUseCase };
