import { Router } from "express";
import { getFilteredForecastData, getFilteredForecastMetrics } from "../controller/forecast";
const router = Router();

router.post("/get-filtered-forecast-data", getFilteredForecastData);
router.post("/get-filtered-forecast-metrics", getFilteredForecastMetrics);


export default router;
