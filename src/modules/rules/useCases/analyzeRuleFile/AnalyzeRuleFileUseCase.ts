import yara from "@automattic/yara";
import fs from "node:fs";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { Rule } from "../../entities/Rule";
import { IRulesRepository } from "../../repositories/IRulesRepository";
import { IAnalyzerInput, IRequest, IScanResult } from "./types";

@injectable()
class AnalyzeRuleFileUseCase {
  constructor(
    @inject("RulesRepository")
    private rulesRepository: IRulesRepository
  ) {}

  private async analyze({ filePath, rules }: IAnalyzerInput) {
    const rulesStrings = rules.map((rule) => ({ string: rule.rule_string }));

    const scanner = yara.createScanner();

    const warnings = await scanner.configureAsync({ rules: rulesStrings });

    if (warnings.length) {
      throw new AppError(
        "There are some compiler errors: " + JSON.stringify(warnings),
        422
      );
    }

    const textToBeScanned = { filename: filePath };

    const results: IScanResult = await scanner.scanAsync(textToBeScanned);

    await fs.promises.unlink(filePath);

    return this.mapResultsForResponse(results, rules);
  }

  private mapResultsForResponse(results: IScanResult, rules: Rule[]) {
    return rules.map((rule) => {
      const resultRule = results.rules.find((rRule) =>
        rule.rule_string.includes(rRule.id)
      )!;

      const matched = resultRule ? resultRule.matches.length > 0 : false;

      return {
        rule_id: rule.id,
        matched,
      };
    });
  }

  async execute({ file, rules }: IRequest) {
    const rulesIds = rules.map((rule) => rule.rule_id);

    const rulesFromRepository = await this.rulesRepository.findByIds(rulesIds);

    return this.analyze({
      filePath: file.path,
      rules: rulesFromRepository,
    });
  }
}

export { AnalyzeRuleFileUseCase };
