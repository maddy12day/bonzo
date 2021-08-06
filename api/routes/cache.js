import { Router } from "express";
import {
  filterAllOptions,
  programFilterDropdownData,
  programFiltersData,
  regularFilterDropdownData,
  regularFiltersData,
  setProgramFilterCache
} from "../controller/cache";

const router = Router();
router.get("/program-filter-dropdown-cache", programFilterDropdownData);
router.get("/regular-filter-dropdown-cache", regularFilterDropdownData);
router.get('/filter-all-options-dropdown-cache', filterAllOptions)
router.get('/cache-setter-api', setProgramFilterCache);

router.get('/program-filter-data', programFiltersData)
router.get('/regular-filter-data', regularFiltersData)

export default router;
