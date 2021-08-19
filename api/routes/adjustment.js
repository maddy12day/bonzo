import { Router } from "express";
import { getBaseAdjustments, createManualAdjustment, getWeekendDates, checkAdjustmentStatus, getAdjustmentSalesSummary, getMasterMetricsData, getAdjustmentCategoryComparison, getAdjustmentCategorySalesComparison, getAdjustmentUnitSalesComparison, getAdjustmentById } from "../controller/adjustment";

const router = Router();
router.get("/get-base-adjustments", getBaseAdjustments);
router.get('/get-weekend-dates/:year', getWeekendDates);
router.post('/create-manualadjustment', createManualAdjustment);
router.get('/get-adjustment-status/:id', checkAdjustmentStatus);
router.get('/get-adjustment/:id', getAdjustmentById)
router.get("/get-adjustment-sales-summary/:id", getAdjustmentSalesSummary);
router.get('/master-metrics-data', getMasterMetricsData)
router.get("/get-adjustment-category-comparison/:id", getAdjustmentCategoryComparison);
router.get("/get-adjustment-category-sales-comparison/:id", getAdjustmentCategorySalesComparison);
router.get("/get-adjustment-unit-sales-comparison/:id",getAdjustmentUnitSalesComparison);

export default router;
