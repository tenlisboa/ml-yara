import { Rule } from "../../entities/Rule";
export interface IRequest {
  file: Express.Multer.File;
  rules: RuleRequest[];
}
