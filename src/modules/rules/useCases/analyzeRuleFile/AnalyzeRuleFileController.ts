import { Request, Response } from "express";
import { container } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { AnalyzeRuleFileUseCase } from "./AnalyzeRuleFileUseCase";

class AnalyzeRuleFileController {
  async handle(request: Request, response: Response) {
    const { file } = request;
    const { rules } = request.body;

    if (!rules || !rules.length || !file) {
      throw new AppError(
        "The property 'rules' and 'file' should be provided.",
        422
      );
    }

    const rulesToArray = rules
      .split(",")
      .map((ruleId: string) => ({ rule_id: Number(ruleId) }));

    const analyzeRuleFileUseCase = container.resolve(AnalyzeRuleFileUseCase);
    const results = await analyzeRuleFileUseCase.execute({
      file,
      rules: rulesToArray,
    });

    return response.status(200).json({
      error: false,
      results,
    });
  }
}

export { AnalyzeRuleFileController };
