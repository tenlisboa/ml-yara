import { Router } from "express";

import { CreateRuleController } from "../modules/rules/useCases/createRule/CreateRuleController";
import { ListRulesController } from "../modules/rules/useCases/listRules/ListRulesController";

const rulesRoutes = Router();

const createRuleController = new CreateRuleController();
const listRulesController = new ListRulesController();

rulesRoutes.get("/", listRulesController.handle);
rulesRoutes.post("/", createRuleController.handle);

export { rulesRoutes };
