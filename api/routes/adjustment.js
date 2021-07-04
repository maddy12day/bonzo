import { Router } from "express";
import { getBaseAdjustments } from "../controller/adjustment";

const router = Router();
router.get("/get-base-adjustments", getBaseAdjustments);

export default router;
