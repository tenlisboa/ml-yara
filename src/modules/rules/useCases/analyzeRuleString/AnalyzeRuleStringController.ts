import { Request, Response } from "express";
import { container } from "tsyringe";
import { AnalyzeRuleStringUseCase } from "./AnalyzeRuleStringUseCase";

class AnalyzeRuleStringController {
  async handle(request: Request, response: Response) {
    const { text, rules } = request.body;

    const analyzeRUleStringUseCase = container.resolve(
      AnalyzeRuleStringUseCase
    );
    const results = await analyzeRUleStringUseCase.execute({ text, rules });

    return response.status(200).json({
      error: false,
      results,
    });
  }
}

export { AnalyzeRuleStringController };
