import { Router } from "express";
import { allSharedScenarios, getUserScenarios } from "../controller/scenario";
import { getAllUsers } from "../controller/user";

const router = Router();
router.get("/shared-scenarios", allSharedScenarios);
router.get("/get-user-scenarios/:id", getUserScenarios);
router.get("/get-all-users", getAllUsers);

export default router;
