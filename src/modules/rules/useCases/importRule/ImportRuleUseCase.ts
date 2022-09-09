import fs from "fs";
import { IRulesRepository } from "../../repositories/IRulesRepository";
import { inject, injectable } from "tsyringe";

interface IImportRule {
  name: string;
  rule_string: string;
}

@injectable()
class ImportRuleUseCase {
  constructor(
    @inject("RulesRepository")
    private rulesRepository: IRulesRepository
  ) {}

  loadRules(file: Express.Multer.File): Promise<IImportRule[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const rules: IImportRule[] = [];

      // const parseFile = csvParse();

      // stream.pipe(parseFile);

      // parseFile
      //   .on("data", async (line) => {
      //     const [name, rule_string] = line;

      //     rules.push({
      //       name,
      //       rule_string,
      //     });
      //   })
      //   .on("end", () => {
      //     fs.promises.unlink(file.path);
      //     resolve(rules);
      //   })
      //   .on("error", (err) => reject(err));
    });
  }

  async execute(file: Express.Multer.File) {
    const rules = await this.loadRules(file);

    rules.map((rule) => {
      const { name, rule_string } = rule;

      const ruleExist = this.rulesRepository.findByName(name);

      if (!ruleExist) {
        this.rulesRepository.create({ name, rule_string });
      }
    });
  }
}

export { ImportRuleUseCase };
