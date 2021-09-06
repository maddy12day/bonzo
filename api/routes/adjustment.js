import { Router } from "express";
<<<<<<< HEAD
import { getBaseAdjustments, createManualAdjustment, getWeekendDates, checkAdjustmentStatus, getAdjustmentSalesSummary, getMasterMetricsData, getAdjustmentCategoryComparison, getAdjustmentCategorySalesComparison, getAdjustmentUnitSalesComparison, getAdjustmentById, activateAdjustmentAsBase, AdjustmentStatus } from "../controller/adjustment";
=======
import { getBaseAdjustments, createManualAdjustment, getWeekendDates, checkAdjustmentStatus, getAdjustmentSalesSummary, getMasterMetricsData, getAdjustmentCategoryComparison, getAdjustmentCategorySalesComparison, getAdjustmentUnitSalesComparison, getAdjustmentById, activateManualAdjustment } from "../controller/adjustment";
>>>>>>> 5b200c656f913be59040b814b75645cb5ccb71c5

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
<<<<<<< HEAD
router.get('/activate-manual-adjustment/:id', activateAdjustmentAsBase);
router.get('/check-adjustment-status/:id', AdjustmentStatus)
=======
router.post("/activate-adjustments", activateManualAdjustment);
>>>>>>> 5b200c656f913be59040b814b75645cb5ccb71c5

export default router;
