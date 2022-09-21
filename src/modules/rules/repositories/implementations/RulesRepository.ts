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
    return await this.repository.find({
      relations: {
        analyzedAssets: true,
      },
    });
  }

  async findByName(name: string): Promise<Rule> {
    const rule = await this.repository.findOneBy({ name });

    return rule!;
  }

  async create({ name, ruleString }: ICreateRuleDTO): Promise<Rule> {
    const rule = this.repository.create({
      ruleString,
      name,
    });

    return await this.repository.save(rule);
  }
}

export { RulesRepository };
