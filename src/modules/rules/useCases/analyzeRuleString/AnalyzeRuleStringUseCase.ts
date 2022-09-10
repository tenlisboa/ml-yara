import yara from "@automattic/yara";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { Rule } from "../../entities/Rule";
import { IRulesRepository } from "../../repositories/IRulesRepository";
import { IAnalyzerInput, IRequest, IScanResult } from "./types";

@injectable()
class AnalyzeRuleStringUseCase {
  constructor(
    @inject("RulesRepository")
    private rulesRepository: IRulesRepository
  ) {}

  private async analyze({ text, rules }: IAnalyzerInput) {
    const rulesStrings = rules.map((rule) => ({ string: rule.rule_string }));

    const scanner = yara.createScanner();

    const warnings = await scanner.configureAsync({ rules: rulesStrings });

    if (warnings.length) {
      throw new AppError(
        "There are some compiler errors: " + JSON.stringify(warnings),
        422
      );
    }

    const textToBeScanned = { buffer: Buffer.from(text) };

    const results: IScanResult = await scanner.scanAsync(textToBeScanned);

    return this.mapResultsForResponse(results, rules);
  }

  private mapResultsForResponse(results: IScanResult, rules: Rule[]) {
    return rules.map((rule) => {
      const resultRule = results.rules.find((rRule) =>
        rule.rule_string.includes(rRule.id)
      )!;

      return {
        rule_id: rule.id,
        matched: resultRule.matches.length > 0,
      };
    });
  }

  async execute({ text, rules }: IRequest) {
    const rulesIds = rules.map((rule) => rule.rule_id);

    const rulesFromRepository = await this.rulesRepository.findByIds(rulesIds);

    return this.analyze({
      text,
      rules: rulesFromRepository,
    });
  }
}

export { AnalyzeRuleStringUseCase };
