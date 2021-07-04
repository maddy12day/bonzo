import { Router } from "express";
import { getFilteredForecastData, getFilteredForecastMetrics, getFilteredStataData } from "../controller/forecast";
const router = Router();

router.post("/get-filtered-forecast-data", getFilteredForecastData);
router.post("/get-filtered-forecast-metrics", getFilteredForecastMetrics);
router.post("/get-filtered-stats", getFilteredStataData);


export default router;
