import { Rule } from "../../entities/Rule";

type RuleRequest = {
  rule_id: number;
};

export interface IRequest {
  text: string;
  rules: RuleRequest[];
}
