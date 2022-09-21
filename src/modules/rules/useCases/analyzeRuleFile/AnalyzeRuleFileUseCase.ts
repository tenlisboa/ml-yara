import { inject, injectable } from "tsyringe";
import { IAnalyzedAssetsRepository } from "../../repositories/IAnalyzedAssetsRepository";
import { IRulesRepository } from "../../repositories/IRulesRepository";
import { Analyzer } from "../../services/Analyzer";
import { IRequest } from "./types";

@injectable()
class AnalyzeRuleFileUseCase {
  constructor(
    @inject("RulesRepository")
    private rulesRepository: IRulesRepository,

    @inject("AnalyzedAssetsRepository")
    private analyzedAssetsRepository: IAnalyzedAssetsRepository
  ) {}

  async execute({ file, rules }: IRequest) {
    const rulesIds = rules.map((rule) => rule.rule_id);

    const rulesFromRepository = await this.rulesRepository.findByIds(rulesIds);
    const analyzer = new Analyzer();

    const results = await analyzer.analyze({
      source: file,
      rules: rulesFromRepository,
    });

    // TODO Converting to jobs after finishing
    await Promise.all(
      results.map(({ ruleId, matched }) =>
        this.analyzedAssetsRepository.create({
          source: file,
          matched,
          ruleId: ruleId,
        })
      )
    );

    return results;
  }
}

export { AnalyzeRuleFileUseCase };
