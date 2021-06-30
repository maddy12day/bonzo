import { Router } from "express";
import { getBaseWeeklyMetrics } from "../controller/metrics";

const router = Router();

router.get('/base-weekly-metrics', getBaseWeeklyMetrics);

export default router;