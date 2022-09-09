import { Router } from "express";
import { rulesRoutes } from "./rules.routes";

const router = Router();

router.use("/rules", rulesRoutes);

export { router };
