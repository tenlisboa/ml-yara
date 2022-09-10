import { Router } from "express";
import { AnalyzeRuleStringController } from "../modules/rules/useCases/analyzeRuleString/AnalyzeRuleStringController";
import multer from "multer";

import { CreateRuleController } from "../modules/rules/useCases/createRule/CreateRuleController";
import { ListRulesController } from "../modules/rules/useCases/listRules/ListRulesController";
import { AnalyzeRuleFileController } from "../modules/rules/useCases/analyzeRuleFile/AnalyzeRuleFileController";

const rulesRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

const createRuleController = new CreateRuleController();
const listRulesController = new ListRulesController();
const analyzeRuleStringController = new AnalyzeRuleStringController();
const analyzeRuleFileController = new AnalyzeRuleFileController();

rulesRoutes.get("/", listRulesController.handle);
rulesRoutes.post("/", createRuleController.handle);

rulesRoutes.post("/analyze", analyzeRuleStringController.handle);
rulesRoutes.post(
  "/analyze/file",
  upload.single("file"),
  analyzeRuleFileController.handle
);

export { rulesRoutes };
