import { Router } from "express";
import {
  getFilteredForecastData,
  getFilteredForecastMetrics,
  getFilteredYearlyStatsData,
  getFilteredQuarterlyStatsData,
  downloadAllSkusData,
  getFilterChartData,
  collectionFilteredForecast,
  collectionFilteredForecastByEcomm,
  collectionFilteredForecastByRetail,
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
router.post("/collection-forecast/:forecast_year", collectionFilteredForecast);
router.post(
  "/collection-forecast-by-ecomm/:forecast_year",
  collectionFilteredForecastByEcomm
);
router.post(
  "/collection-forecast-by-retail/:forecast_year",
  collectionFilteredForecastByRetail
);

export default router;
