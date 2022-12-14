import { Repository } from "typeorm";
import { AppDataSource } from "../../../../database";
import { AnalyzedAsset } from "../../entities/AnalyzedAsset";
import {
  IAnalyzedAssetsRepository,
  ICreateAnalyzedAssetDTO,
} from "../IAnalyzedAssetsRepository";

class AnalyzedAssetsRepository implements IAnalyzedAssetsRepository {
  private repository: Repository<AnalyzedAsset>;

  constructor() {
    this.repository = AppDataSource.getRepository(AnalyzedAsset);
  }

  async findByRuleId(ruleId: number): Promise<AnalyzedAsset[]> {
    const analyzedAssets = await this.repository.findBy({ ruleId: ruleId });

    return analyzedAssets;
  }

  async create({
    source,
    ruleId,
    matched,
  }: ICreateAnalyzedAssetDTO): Promise<AnalyzedAsset> {
    const sourceIsFile = source instanceof Object && "path" in source;

    let donwloadLink;

    if (sourceIsFile)
      [
        (donwloadLink = `${process.env.APP_URL}${source.path.replace(
          "tmp/",
          ""
        )}`),
      ];

    const data = {
      source: sourceIsFile ? source.originalname : source,
      sourceIsFile,
      ruleId,
      matched,
      donwloadLink,
    };

    const alreadyExists = await this.repository.findOneBy(data);

    if (!alreadyExists) {
      const analyzedAsset = this.repository.create(data);

      return await this.repository.save(analyzedAsset);
    }

    return alreadyExists;
  }
}

export { AnalyzedAssetsRepository };
