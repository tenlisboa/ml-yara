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

    const analyzedAsset = this.repository.create({
      source: sourceIsFile ? source.originalname : source,
      sourceIsFile,
      ruleId: ruleId,
      matched,
    });

    return await this.repository.save(analyzedAsset);
  }
}

export { AnalyzedAssetsRepository };
