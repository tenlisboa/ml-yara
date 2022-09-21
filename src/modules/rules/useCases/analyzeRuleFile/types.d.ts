import { Rule } from "../../entities/Rule";

type RuleRequest = {
  rule_id: number;
};
export interface IRequest {
  file: Express.Multer.File;
  rules: RuleRequest[];
}
