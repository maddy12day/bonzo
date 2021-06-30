import { Router } from "express";
import { allSharedScenarios } from "../controller/scenario";

const router = Router();
router.get("/shared-scenarios", allSharedScenarios);

export default router;
