import { Router } from "express";
import { allSharedScenarios, createScenario, getUserScenarios, scenarioTypes } from "../controller/scenario";
import { getAllUsers } from "../controller/user";

const router = Router();
router.get("/shared-scenarios", allSharedScenarios);
router.get("/get-user-scenarios/:id", getUserScenarios);
router.get("/get-all-users", getAllUsers);
router.get('/get-all-scenario-types', scenarioTypes)
router.post('/create-scenario', createScenario)

export default router;
