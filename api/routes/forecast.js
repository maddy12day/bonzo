import { Router } from "express";
import {
  getFilteredForecastData,
  getFilteredForecastMetrics,
  getFilteredYearlyStatsData,
  getFilteredQuarterlyStatsData,
  downloadAllSkusData,
  getFilterChartData,
} from "../controller/forecast";
const router = Router();

router.post(
  "/get-filtered-forecast-data/:filterForecastedYear",
  getFilteredForecastData
);
router.post(
  "/get-filtered-forecast-metrics/:filterForecastedYear",
  getFilteredForecastMetrics
);
router.post(
  "/get-filtered-yearly-stats/:filterForecastedYear",
  getFilteredYearlyStatsData
);
router.post(
  "/get-filtered-quarterly-stats/:filterForecastedYear",
  getFilteredQuarterlyStatsData
);
router.post(
  "/download-all-skus-data/:filterForecastedYear",
  downloadAllSkusData
);
router.post(
  "/get-filtered-chart-data-by-duration/:filterForecastedYear",
  getFilterChartData
);

export default router;
