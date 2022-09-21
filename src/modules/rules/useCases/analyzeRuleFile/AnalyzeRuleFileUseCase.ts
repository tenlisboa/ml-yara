import { inject, injectable } from "tsyringe";
import { IRulesRepository } from "../../repositories/IRulesRepository";
import { Analyzer } from "../../services/Analyzer";
import { IRequest } from "./types";

@injectable()
class AnalyzeRuleFileUseCase {
  constructor(
    @inject("RulesRepository")
    private rulesRepository: IRulesRepository
  ) {}

  async execute({ file, rules }: IRequest) {
    const rulesIds = rules.map((rule) => rule.rule_id);

    const rulesFromRepository = await this.rulesRepository.findByIds(rulesIds);
    const analyzer = new Analyzer();

    return analyzer.analyze({
      source: file,
      rules: rulesFromRepository,
    });
  }
}

export { AnalyzeRuleFileUseCase };
