import { Router } from "express";
import { getWeeklyChartData } from "../controller/chart";

const router = Router();
router.get("/weekly-chart-data", getWeeklyChartData);

export default router;
