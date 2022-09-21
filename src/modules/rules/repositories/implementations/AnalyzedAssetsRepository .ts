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
    const analyzedAssets = await this.repository.findBy({ rule_id: ruleId });

    return analyzedAssets;
  }

  async create({
    source,
    ruleId,
    matched,
  }: ICreateAnalyzedAssetDTO): Promise<AnalyzedAsset> {
    const source_is_file = source instanceof Object && "path" in source;

    const analyzedAsset = this.repository.create({
      source: source_is_file ? source.originalname : source,
      source_is_file,
      rule_id: ruleId,
      matched,
    });

    return await this.repository.save(analyzedAsset);
  }
}

export { AnalyzedAssetsRepository };
