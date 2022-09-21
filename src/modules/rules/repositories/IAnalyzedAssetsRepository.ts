import { AnalyzedAsset } from "../entities/AnalyzedAsset";

interface ICreateAnalyzedAssetDTO {
  source: string | Express.Multer.File;
  ruleId: number;
  matched: boolean;
}

interface IAnalyzedAssetsRepository {
  findByRuleId(ruleId: number): Promise<AnalyzedAsset[]>;
  create({
    source,
    ruleId,
    matched,
  }: ICreateAnalyzedAssetDTO): Promise<AnalyzedAsset>;
}

export { IAnalyzedAssetsRepository, ICreateAnalyzedAssetDTO };
