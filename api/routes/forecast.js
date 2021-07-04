import { Router } from "express";
import { createManualAdjustment, getFilteredForecastData, getWeekendDates } from "../controller/forecast";
const router = Router();

router.post("/get-filtered-forecast-data", getFilteredForecastData);
router.get('/get-weekend-dates', getWeekendDates);
router.post('/create-manualadjustment', createManualAdjustment)

export default router;
