import { Router } from "express";
import {
  filterAllOptions,
  programFilterDropdownData,
  regularFilterDropdownData,
} from "../controller/cache";

const router = Router();
router.get("/program-filter-dropdown-cache", programFilterDropdownData);
router.get("/regular-filter-dropdown-cache", regularFilterDropdownData);
router.get('/filter-all-options-dropdown-cache', filterAllOptions)

export default router;
