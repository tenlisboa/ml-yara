import { Request, Response } from "express";
import { container } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { AnalyzeRuleStringUseCase } from "./AnalyzeRuleStringUseCase";

class AnalyzeRuleStringController {
  async handle(request: Request, response: Response) {
    const { text, rules } = request.body;

    if (!rules || !rules.length || !text) {
      throw new AppError(
        "The property 'rules' and 'text' should be provided.",
        422
      );
    }

    const analyzeRuleStringUseCase = container.resolve(
      AnalyzeRuleStringUseCase
    );
    const results = await analyzeRuleStringUseCase.execute({ text, rules });

    return response.status(200).json({
      error: false,
      results,
    });
  }
}

export { AnalyzeRuleStringController };
