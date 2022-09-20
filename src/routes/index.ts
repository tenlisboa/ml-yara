import { Router } from "express";
import { analyzeRoutes } from "./analyze.routes";
import { rulesRoutes } from "./rules.routes";

const router = Router();

router.use("/rule", rulesRoutes);
router.use("/analyze", analyzeRoutes);

export { router };
