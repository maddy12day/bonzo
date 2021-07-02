import { Router } from "express";
import { getFilteredForecastData } from "../controller/forecast";
const router = Router();

router.post("/get-filtered-forecast-data", getFilteredForecastData);

export default router;
