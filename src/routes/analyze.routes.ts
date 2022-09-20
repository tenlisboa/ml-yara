import { Router } from "express";
import { AnalyzeRuleStringController } from "../modules/rules/useCases/analyzeRuleString/AnalyzeRuleStringController";
import multer from "multer";

import { AnalyzeRuleFileController } from "../modules/rules/useCases/analyzeRuleFile/AnalyzeRuleFileController";

const analyzeRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

const analyzeRuleStringController = new AnalyzeRuleStringController();
const analyzeRuleFileController = new AnalyzeRuleFileController();

analyzeRoutes.post("/text", analyzeRuleStringController.handle);
analyzeRoutes.post(
  "/file",
  upload.single("file"),
  analyzeRuleFileController.handle
);

export { analyzeRoutes };
