getMergeScenarioTimeLineNodes

import { Router } from "express";
import {
 getGenensisNodeDetails,
 getMergeScenarioTimeLineNodes
} from "../controller/timeline";

const router = Router();
router.get("/genesis-node-time-line", getGenensisNodeDetails);
router.get("/merge-scenario-time-line", getMergeScenarioTimeLineNodes);
export default router;
