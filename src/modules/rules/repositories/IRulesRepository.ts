import { Rule } from "../entities/Rule";

interface ICreateRuleDTO {
  name: string;
  ruleString: string;
}

interface IRulesRepository {
  findByName(name: string): Promise<Rule>;
  findByIds(ids: number[]): Promise<Rule[]>;
  list(): Promise<Rule[]>;
  create({ name, ruleString }: ICreateRuleDTO): Promise<Rule>;
}

export { IRulesRepository, ICreateRuleDTO };
