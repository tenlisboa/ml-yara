import { container } from "tsyringe";
import { IRulesRepository } from "../../modules/rules/repositories/IRulesRepository";
import { RulesRepository } from "../../modules/rules/repositories/implementations/RulesRepository";

container.registerSingleton<IRulesRepository>(
  "RulesRepository",
  RulesRepository
);
