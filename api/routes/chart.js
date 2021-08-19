import { Router } from "express";
import { getMonthlyChartBaseData, getWeeklyChartBaseData, getWeeklyChartData } from "../controller/chart";

const router = Router();
router.get("/weekly-chart-data", getWeeklyChartData);
router.get('/weekly-base-forecast-chart/:forecasted_year', getWeeklyChartBaseData);
router.get('/monthly-base-forecast-chart/:forecasted_year', getMonthlyChartBaseData)

export default router;
