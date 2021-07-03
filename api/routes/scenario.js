import { Router } from "express";
import {
  allSharedScenarios,
  createScenario,
  getUserScenarios,
  scenarioTypes,
  getScenarioCategoryComparison,
  getScenarioUnitSalesComparison,
  getScenarioCategorySalesComparison,
  getScenarioSalesSummary,
  checkScenarioStatus,
} from "../controller/scenario";
import { getAllUsers } from "../controller/user";

const router = Router();
router.get("/shared-scenarios", allSharedScenarios);
router.get("/get-user-scenarios/:id", getUserScenarios);
router.get("/get-all-users", getAllUsers);
router.get("/get-all-scenario-types", scenarioTypes);
router.post("/create-scenario", createScenario);
router.get(
  "/get-scenario-category-comparison/:id",
  getScenarioCategoryComparison
);
router.get(
  "/get-scenario-category-sales-comparison/:id",
  getScenarioCategorySalesComparison
);
router.get(
  "/get-scenario-unit-sales-comparison/:id",
  getScenarioUnitSalesComparison
);
router.get("/get-scenario-sales-summary/:id", getScenarioSalesSummary);
router.get("/get-scenario-status/:id", checkScenarioStatus);

export default router;
