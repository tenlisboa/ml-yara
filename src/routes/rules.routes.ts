import { Router } from "express";
// import multer from "multer";

import { CreateRuleController } from "../modules/rules/useCases/createRule/CreateRuleController";
// import { ImportRuleController } from "../modules/rules/useCases/importRule/ImportRuleController";
import { ListRulesController } from "../modules/rules/useCases/listRules/ListRulesController";

const rulesRoutes = Router();

// const upload = multer({
//   dest: "./tmp",
// });

const createRuleController = new CreateRuleController();
const listRulesController = new ListRulesController();
// const importRuleController = new ImportRuleController();

rulesRoutes.get("/", listRulesController.handle);
rulesRoutes.post("/", createRuleController.handle);

// rulesRoutes.post("/analyze", importRuleController.handle);
// rulesRoutes.post("/analyze/file", upload.single("file"), importRuleController.handle);

export { rulesRoutes };
