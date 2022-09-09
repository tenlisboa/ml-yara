import { Rule } from "../entities/Rule";

interface ICreateRuleDTO {
  name: string;
  rule_string: string;
}

interface IRulesRepository {
  findByName(name: string): Promise<Rule>;
  list(): Promise<Rule[]>;
  create({ name, rule_string }: ICreateRuleDTO): Promise<void>;
}

export { IRulesRepository, ICreateRuleDTO };
