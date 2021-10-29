getMergeScenarioTimeLineNodes

import { Router } from "express";
import {
  getGenensisNodeDetails,
  getMergeScenarioTimeLineNodes,
  lockSystem
} from "../controller/timeline";
const router = Router();
router.get("/genesis-node-time-line", getGenensisNodeDetails);
router.get("/merge-scenario-time-line", getMergeScenarioTimeLineNodes);
router.post("/lock-system", lockSystem);
export default router;
