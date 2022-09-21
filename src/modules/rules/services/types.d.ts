type ResultMatch = {
  offset: number;
  length: number;
  id: string;
};

type RulesFromResults = {
  id: string;
  matches: ResultMatch[];
};

export interface IAnalyzerInput {
  source: Express.Multer.File.path | string;
  rules: Rule[];
}

export interface IScanResult {
  rules: RulesFromResults[];
}
