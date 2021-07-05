import { Router } from "express";
import { getFilteredForecastData, getFilteredForecastMetrics, getFilteredYearlyStatsData } from "../controller/forecast";
const router = Router();

router.post("/get-filtered-forecast-data", getFilteredForecastData);
router.post("/get-filtered-forecast-metrics", getFilteredForecastMetrics);
router.post("/get-filtered-yearly-stats", getFilteredYearlyStatsData);

export default router;
