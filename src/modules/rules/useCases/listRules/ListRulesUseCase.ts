import { inject, injectable } from "tsyringe";
import { Rule } from "../../entities/Rule";
import { IRulesRepository } from "../../repositories/IRulesRepository";

@injectable()
class ListRulesUseCase {
  constructor(
    @inject("RulesRepository")
    private rulesRepository: IRulesRepository
  ) {}

  async execute(): Promise<Rule[]> {
    const rules = await this.rulesRepository.list();

    return rules;
  }
}

export { ListRulesUseCase };
