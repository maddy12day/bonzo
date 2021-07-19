import { Router } from "express";
import { getFilteredForecastData, getFilteredForecastMetrics, getFilteredYearlyStatsData, getFilteredQuarterlyStatsData, downloadAllSkusData } from "../controller/forecast";
const router = Router();

router.post("/get-filtered-forecast-data", getFilteredForecastData);
router.post("/get-filtered-forecast-metrics", getFilteredForecastMetrics);
router.post("/get-filtered-yearly-stats", getFilteredYearlyStatsData);
router.post("/get-filtered-quarterly-stats", getFilteredQuarterlyStatsData);
router.post('/download-all-skus-data', downloadAllSkusData);


export default router;
