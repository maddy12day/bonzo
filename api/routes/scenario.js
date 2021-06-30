import { Router } from "express";
import { allSharedScenarios, getUserScenarios } from "../controller/scenario";

const router = Router();
router.get("/shared-scenarios", allSharedScenarios);
router.get("/get-user-scenarios", getUserScenarios);

export default router;
