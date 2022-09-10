import { Rule } from "../../entities/Rule";

type RuleRequest = {
  rule_id: number;
};

type ResultMatch = {
  offset: number;
  length: number;
  id: string;
};

type RulesFromResults = {
  id: string;
  matches: ResultMatch[];
};

export interface IRequest {
  file: Express.Multer.File;
  rules: RuleRequest[];
}

export interface IAnalyzerInput {
  filePath: Express.Multer.File.path;
  rules: Rule[];
}

export interface IScanResult {
  rules: RulesFromResults[];
}
