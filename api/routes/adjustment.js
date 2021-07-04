import { Router } from "express";
import { getBaseAdjustments, createManualAdjustment, getWeekendDates, checkAdjustmentStatus } from "../controller/adjustment";

const router = Router();
router.get("/get-base-adjustments", getBaseAdjustments);
router.get('/get-weekend-dates', getWeekendDates);
router.post('/create-manualadjustment', createManualAdjustment);
router.get('/get-adjustment-status/:id', checkAdjustmentStatus);
export default router;
