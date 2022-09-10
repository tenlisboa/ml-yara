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
  text: string;
  rules: RuleRequest[];
}

export interface IAnalyzerInput {
  text: string;
  rules: Rule[];
}

export interface IScanResult {
  rules: RulesFromResults[];
}
