import { Router } from "express";
import { getFilteredForecastData } from "../controller/forecast";
const router = Router();

router.get("/get-filtered-forecast-data", getFilteredForecastData);

export default router;
