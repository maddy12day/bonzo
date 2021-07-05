import { Router } from "express";
import { getBaseAdjustments, createManualAdjustment, getWeekendDates, checkAdjustmentStatus, getAdjustmentSalesSummary } from "../controller/adjustment";

const router = Router();
router.get("/get-base-adjustments", getBaseAdjustments);
router.get('/get-weekend-dates', getWeekendDates);
router.post('/create-manualadjustment', createManualAdjustment);
router.get('/get-adjustment-status/:id', checkAdjustmentStatus);
router.get("/get-adjustment-sales-summary/:id", getAdjustmentSalesSummary);

export default router;
