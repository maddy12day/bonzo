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
  collectionForecast,
  collectionForecastByEcomm,
  collectionForecastByRetail,
  forecastByCategoryByEcomm,
  forecastByCategoryByTotal,
  ecommForecast,
  retailForecast,
  totalForecast,
  forecastByCategoryByRetail,
} from "../controller/metrics";

const router = Router();

router.get("/base-weekly-metrics/:forecast_year", getBaseWeeklyMetrics);
router.get("/base-monthly-metrics/:forecast_year", getBaseMonthlyMetrics);
router.get(
  "/base-yearly-quarterly-forecast/:forecast_year",
  getBaseYearlyQarterlyForecast
);
router.get("/base-yearly-planned/:forecast_year", getBaseYearlyPlanned);
router.get("/based-quarterly-planned/:forecast_year", getBaseQuarterlyPlanned);
router.get(
  "/based-quarterly-sale-this-year/:forecast_year",
  getBaseThisQuarterlySale
);
router.get(
  "/based-yearly-sale-this-year/:forecast_year",
  getBaseThisYearlySale
);
router.get("/getWeekends", getWeekends);
// collection level forecast
router.get("/collection-forecast/:forecast_year", collectionForecast);
router.get(
  "/collection-forecast-by-ecomm/:forecast_year",
  collectionForecastByEcomm
);
router.get(
  "/collection-forecast-by-retail/:forecast_year",
  collectionForecastByRetail
);
router.get(
  "/forecast-category-by-ecomm/:forecast_year",
  forecastByCategoryByEcomm
);
router.get(
  "/forecast-category-by-retail/:forecast_year",
  forecastByCategoryByRetail
);
router.get(
  "/forecast-category-by-total/:forecast_year",
  forecastByCategoryByTotal
);
router.get("/retial-forecast/:forecast_year", retailForecast);
router.get("/ecomm-forecast/:forecast_year", ecommForecast);
router.get("/total-forecast/:forecast_year", totalForecast);

export default router;
