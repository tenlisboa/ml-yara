import { inject, injectable } from "tsyringe";
import { IAnalyzedAssetsRepository } from "../../repositories/IAnalyzedAssetsRepository";
import { IRulesRepository } from "../../repositories/IRulesRepository";
import { Analyzer } from "../../services/Analyzer";
import { IRequest } from "./types";

@injectable()
class AnalyzeRuleStringUseCase {
  constructor(
    @inject("RulesRepository")
    private rulesRepository: IRulesRepository,

    @inject("AnalyzedAssetsRepository")
    private analyzedAssetsRepository: IAnalyzedAssetsRepository
  ) {}

  async execute({ text, rules }: IRequest) {
    const rulesIds = rules.map((rule) => rule.rule_id);

    const rulesFromRepository = await this.rulesRepository.findByIds(rulesIds);
    const analyzer = new Analyzer();

    const results = await analyzer.analyze({
      source: text,
      rules: rulesFromRepository,
    });

    // TODO Converting to jobs after finishing
    await Promise.all(
      results.map(({ rule_id, matched }) =>
        this.analyzedAssetsRepository.create({
          source: text,
          matched,
          ruleId: rule_id,
        })
      )
    );

    return results;
  }
}

export { AnalyzeRuleStringUseCase };
