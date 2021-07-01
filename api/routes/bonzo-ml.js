import { Router } from "express";
import { runBaseForecast, runScenarioForecast, runScenarioMerge, runAdjustmentForecast } from "../controller/bonzo-ml";

const router = Router();

router.post("/run-base-forecast", runBaseForecast);
router.post("/run-scenario-forecast", runScenarioForecast);
router.post("/run-scenario-merge", runScenarioMerge);
router.post("/run-adjustment-forecast", runAdjustmentForecast);

export default router;
