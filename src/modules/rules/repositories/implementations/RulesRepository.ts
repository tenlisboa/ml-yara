import { FindOptionsWhere, Repository } from "typeorm";
import { AppDataSource } from "../../../../database";
import { Rule } from "../../entities/Rule";
import { IRulesRepository, ICreateRuleDTO } from "../IRulesRepository";

class RulesRepository implements IRulesRepository {
  private repository: Repository<Rule>;

  constructor() {
    this.repository = AppDataSource.getRepository(Rule);
  }

  async findByIds(ids: number[]): Promise<Rule[]> {
    const where = ids.map<FindOptionsWhere<Rule>>((id) => {
      return { id };
    });

    const rules = await this.repository.find({
      where,
    });

    return rules;
  }

  async list(): Promise<Rule[]> {
    return await this.repository.find();
  }

  async findByName(name: string): Promise<Rule> {
    const rule = await this.repository.findOneBy({ name });

    return rule!;
  }

  async create({ name, rule_string }: ICreateRuleDTO): Promise<void> {
    const rule = this.repository.create({
      rule_string,
      name,
    });

    await this.repository.save(rule);
  }
}

export { RulesRepository };
