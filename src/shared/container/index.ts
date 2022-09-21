import { container } from "tsyringe";
import { IRulesRepository } from "../../modules/rules/repositories/IRulesRepository";
import { RulesRepository } from "../../modules/rules/repositories/implementations/RulesRepository";
import { IAnalyzedAssetsRepository } from "../../modules/rules/repositories/IAnalyzedAssetsRepository";
import { AnalyzedAssetsRepository } from "../../modules/rules/repositories/implementations/AnalyzedAssetsRepository ";

container.registerSingleton<IRulesRepository>(
  "RulesRepository",
  RulesRepository
);
container.registerSingleton<IAnalyzedAssetsRepository>(
  "AnalyzedAssetsRepository",
  AnalyzedAssetsRepository
);
