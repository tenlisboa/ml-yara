import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IRulesRepository } from "../../repositories/IRulesRepository";

interface IRequest {
  name: string;
  rule_string: string;
}

@injectable()
class CreateRuleUseCase {
  constructor(
    @inject("RulesRepository")
    private rulesRepository: IRulesRepository
  ) {}

  async execute({ name, rule_string }: IRequest): Promise<void> {
    const ruleAlreadyExists = await this.rulesRepository.findByName(name);

    if (ruleAlreadyExists) {
      throw new AppError("Rule Already exists!", 422);
    }

    await this.rulesRepository.create({ name, rule_string });
  }
}

export { CreateRuleUseCase };
