import yara from "@automattic/yara";
import fs from "node:fs";
import { AppError } from "../../../errors/AppError";
import { Rule } from "../entities/Rule";
import { IAnalyzerInput, IScanResult } from "./types";

class Analyzer {
  private getSourceConfigObject(source: Express.Multer.File | string) {
    if (source instanceof Object && "path" in source) {
      return { filename: (source as Express.Multer.File).path };
    }

    return { buffer: Buffer.from(source as string) };
  }

  async analyze({ source, rules }: IAnalyzerInput) {
    const rulesStrings = rules.map((rule) => ({ string: rule.ruleString }));

    const scanner = yara.createScanner();

    const warnings = await scanner.configureAsync({ rules: rulesStrings });

    if (warnings.length) {
      throw new AppError(
        "There are some compiler errors: " + JSON.stringify(warnings),
        422
      );
    }

    const textToBeScanned = this.getSourceConfigObject(source);

    const results: IScanResult = await scanner.scanAsync(textToBeScanned);

    return this.mapResultsForResponse(results, rules);
  }

  private mapResultsForResponse(results: IScanResult, rules: Rule[]) {
    return rules.map((rule) => {
      const resultRule = results.rules.find((rRule) =>
        rule.ruleString.includes(rRule.id)
      )!;

      const matched = resultRule ? resultRule.matches.length > 0 : false;

      return {
        ruleId: rule.id,
        matched,
      };
    });
  }
}

export { Analyzer };
