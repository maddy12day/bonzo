import { Router } from "express";
import { getBaseMonthlyMetrics, getBaseWeeklyMetrics } from "../controller/metrics";

const router = Router();

router.get('/base-weekly-metrics', getBaseWeeklyMetrics);
router.get('/base-monthly-metrics', getBaseMonthlyMetrics);

export default router;