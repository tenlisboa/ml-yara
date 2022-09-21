import { Rule } from "../entities/Rule";

interface ICreateRuleDTO {
  name: string;
  rule_string: string;
}

interface IRulesRepository {
  findByName(name: string): Promise<Rule>;
  findByIds(ids: number[]): Promise<Rule[]>;
  list(): Promise<Rule[]>;
  create({ name, rule_string }: ICreateRuleDTO): Promise<Rule>;
}

export { IRulesRepository, ICreateRuleDTO };
