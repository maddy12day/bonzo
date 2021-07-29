import { Router } from "express";
import { getFilteredForecastData, getFilteredForecastMetrics, getFilteredYearlyStatsData, getFilteredQuarterlyStatsData, downloadAllSkusData, getFilterChartData } from "../controller/forecast";
const router = Router();

router.post("/get-filtered-forecast-data", getFilteredForecastData);
router.post("/get-filtered-forecast-metrics", getFilteredForecastMetrics);
router.post("/get-filtered-yearly-stats", getFilteredYearlyStatsData);
router.post("/get-filtered-quarterly-stats", getFilteredQuarterlyStatsData);
router.post('/download-all-skus-data', downloadAllSkusData);
router.post('/get-filtered-chart-data-by-duration', getFilterChartData)


export default router;
