import { Router } from "express";
import {
  getBaseMonthlyMetrics,
  getBaseQuarterlyPlanned,
  getBaseThisQuarterlySale,
  getBaseThisYearlySale,
  getBaseWeeklyMetrics,
  getBaseYearlyPlanned,
  getBaseYearlyQarterlyForecast,
  getWeekends,
} from "../controller/metrics";

const router = Router();

router.get("/base-weekly-metrics", getBaseWeeklyMetrics);
router.get("/base-monthly-metrics", getBaseMonthlyMetrics);
router.get("/base-yearly-quarterly-forecast", getBaseYearlyQarterlyForecast);
router.get("/base-yearly-planned", getBaseYearlyPlanned);
router.get("/based-quarterly-planned", getBaseQuarterlyPlanned);
router.get("/based-quarterly-sale-this-year", getBaseThisQuarterlySale);
router.get("/based-yearly-sale-this-year", getBaseThisYearlySale);
router.get('/getWeekends', getWeekends)

export default router;
