import { PrismaClient } from "@prisma/client";
import { getAllUsers } from "../controller/user";
import {
  parseCategorySaleComparision,
  parseCategoryUnitComparision,
} from "../controller/scenario";

const prisma = new PrismaClient();

const getUserName = (id, allUsers) => {
  let userName;
  if (allUsers.length > 0) {
    userName = allUsers.filter((user) => user.id == id)[0].first_name;
  } else {
    userName = "";
  }
  return userName;
};

// get Base Adjustments
export const getBaseAdjustments = async (req, res) => {
  try {
    const adjustments = await prisma.manual_adjustments.findMany({
      where: {
        filter_level: "baseVersion",
      },
      orderBy: {
        created_at: "desc",
      },
    });
    let allUsers = await getAllUsers();
    let adjustmentsResponse = adjustments.map((v) => ({
      ...v,
      adjustedBy: getUserName(v.adjusted_by_user_id, allUsers),
    }));

    res.status(200).json({
      adjustmentsResponse,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong in getBaseAdjustments api.",
      error: `${error}`,
    });
  }
};

// weekend dates for manual adustments
export const getWeekendDates = async (req, res) => {
  try {
    const weekends = await prisma.dim_morphe_retail_weekends.findMany({
      where: {
        year: req.params.year,
      },
      select: {
        weekend: true,
      },
    });
    res.status(200).json({
      weekends: weekends.map(
        (item) => item.weekend.toISOString().split("T")[0]
      ),
    });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong in getWeekendDates api",
      error: `${error}`,
    });
  }
};
// create manual adjustment
export const createManualAdjustment = async (req, res) => {
  try {
    const reqObject = { ...req.body };
    if (req.body.hasOwnProperty("filterSkuObject")) {
      delete req.body.filterSkuObject;
    }
    const manualAjustment = await prisma.manual_adjustments.create({
      data: {
        ...req.body,
      },
    });
    console.log("data=0=0", manualAjustment);
    if (reqObject.hasOwnProperty("filterSkuObject")) {
      const reqObjSkuLevel = reqObject.filterSkuObject.map((item) => {
        delete item["adjusted_metrics_name"];
        return {
          ...item,
          adjustment_id: manualAjustment.id,
        };
      });
      console.log(reqObjSkuLevel);
      const skuLevelAdjustment = await prisma.manual_adjustments_sku_level.createMany(
        {
          data: reqObjSkuLevel,
          skipDuplicates: true,
        },
      );
      console.log(skuLevelAdjustment);
    }
    const executed_by = await prisma.users.findUnique({
      where: {
        id: req.body.adjusted_by_user_id,
      },
    });
    const demandForecastRunlogRes = await prisma.demand_forecast_run_log.create(
      {
        data: {
          is_base_forecast: false,
          demand_planner_user_id: req.body.adjusted_by_user_id,
          manual_adjustment_id: manualAjustment.id,
          ma_source_scenario_id: 0,
          status: "Pending",
          forecast_type: "Adjustment",
          executed_by: `${executed_by.first_name} ${executed_by.last_name}`,
        },
      }
    );
    res.json({
      manualAjustment,
      message: "adjustment created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: `something went wrong in createManualAdjustment api ${error}`,
    });
  }
};
export const MonthlyManualAdjustment = async (req, res) => {
  try {
   const reqObject = { ...req.body };
   if (req.body.hasOwnProperty("filterSkuObject")) {
     delete req.body.filterSkuObject;
   }
   const manualAjustment = await prisma.manual_adjustments.create({
     data: {
       ...req.body,
     },
   });
   if (reqObject.hasOwnProperty("filterSkuObject")) {
     const reqObjSkuLevel = reqObject.filterSkuObject.map((item) => {
       delete item["adjusted_metrics_name"];
       return {
         ...item,
         adjustment_id: manualAjustment.id,
       };
     });
     const skuLevelAdjustment = await prisma.manual_adjustments_sku_level.createMany(
       {
         data: reqObjSkuLevel,
         skipDuplicates: true,
       },
     );
   }
   const executed_by = await prisma.users.findUnique({
     where: {
       id: req.body.adjusted_by_user_id,
     },
   });
   const demandForecastRunlogRes = await prisma.demand_forecast_run_log.create(
     {
       data: {
         is_base_forecast: false,
        
         demand_planner_user_id: req.body.adjusted_by_user_id,
         manual_adjustment_id: manualAjustment.id,
         ma_source_scenario_id: 0,
         status: "Pending",
         forecast_type: "Adjustment",
         executed_by: `${executed_by.first_name} ${executed_by.last_name}`,
       },
     }
   );
   res.json({
     manualAjustment,
     message: "adjustment created successfully",
   });
 } catch (error) {
   res.status(500).json({
     message: `something went wrong in createManualAdjustment api ${error}`,
   });
 }
}

export const activateManualAdjustment = async (req, res) => {
  try {
    const manualAdjustments = await prisma.manual_adjustments.update({
      where: {
        id: parseInt(req.body.id),
      },
      data: {
        is_active: true,
      },
    });
    res.json({
      manualAdjustments,
      message: "Adjustment Activated Successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: `Error: ${error}`,
    });
  }
};

// check user created adjustments status
export const checkAdjustmentStatus = async (req, res) => {
  try {
    const adjustments = await prisma.manual_adjustments.findMany({
      where: {
        adjusted_by_user_id: parseInt(req.params.id),
      },
      orderBy: {
        created_at: "desc",
      },
      select: {
        status: true,
        id: true,
      },
    });
    res.json({
      adjustment: adjustments[0],
    });
  } catch (error) {
    res.status(500).json({
      error: `something went wrong in check scenario status api. ${error}`,
    });
  }
};

//adjustment by id
export const getAdjustmentById = async (req, res) => {
  try {
    const adjustments = await prisma.manual_adjustments.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.json({
      adjustment: adjustments,
    });
  } catch (error) {
    res.status(500).json({
      error: `something went wrong in check scenario status api. ${error}`,
    });
  }
};

// master metrics api
export const getMasterMetricsData = async (req, res) => {
  try {
    const masterMetrics = await prisma.metrics_master.findMany({
      where: {
        id: {
          gt: 0,
        },
      },
      select: {
        name: true,
        title: true,
      },
    });
    const masterMetricsData = JSON.parse(
      JSON.stringify(
        masterMetrics,
        (key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
      )
    );
    res.json({
      masterMetricsData,
    });
  } catch (error) {
    res.json({
      error: `error found in master metrics api ${error}`,
    });
  }
};

// Get Adjustment Sales Summary
// Paramenter Passed: Adjustment ID
export const getAdjustmentSalesSummary = async (req, res) => {
  try {
    const result = await prisma.$queryRaw(
      `SELECT * from morphe_staging.adjustment_influenced_leveled_aggregates WHERE adjustment_id = ${req.params.id} AND level = "AGGREGATES";`
    );
    res.json({
      result,
    });
  } catch (error) {
    res.status(500).json({
      error: `Unable to fetch results ${error}`,
    });
  }
};

//API: Adjustment Category Unit & Sales Comparison
export const getAdjustmentCategoryComparison = async (req, res) => {
  try {
    const result = await prisma.$queryRaw(`SELECT 
                                          weekend, 
                                          sum(adjusted_units) as adjusted_units,
                                          sum(forecasted_units) as forecasted_units,
                                          sum(planned_units) as planned_units,
                                          sum(planned_revenue) as planned_revenue,
                                          sum(forecasted_revenue) as forecasted_revenue,
                                          sum(adjusted_revenue) as adjusted_revenue
                                          from morphe_staging.adjustment_influenced_leveled_metrics WHERE adjustment_id = ${req.params.id} group by weekend, level`);
    let parsedData = {};
    parsedData["Units"] = parseCategoryUnitComparision(result);
    parsedData["Revenue"] = parseCategorySaleComparision(result);

    res.status(200).json({
      parsedData,
      result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to Fetch Data",
      error: `${error}`,
    });
  }
};

//API: Adjustment Category Total Sales Comparison
export const getAdjustmentCategorySalesComparison = async (req, res) => {
  try {
    const result = await prisma.$queryRaw(
      `SELECT * from morphe_staging.adjustment_influenced_leveled_aggregates WHERE adjustment_id = ${req.params.id} AND level = "CATEGORY";`
    );
    res.status(200).json({
      result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to Fetch Data",
      error: `${error}`,
    });
  }
};

export const getWeekendDate = async () => {
  try {
    const { year } = req.params;
    const weekends = await prisma.dim_morphe_retail_weekends.findMany({
      where: {
        year: year,
      },
      select: {
        weekend: true,
      },
    });

    return weekends;
  } catch (error) {
    return error;
  }
};

// export const parseCategoryUnitComparision = (results) => {
//   const fields = ["Planned Units", "Adjusted Units", "Forecast Units"];
//   let parsedData = [];
//   for (let field of fields) {
//     const newObject = {};

//     newObject["Comparision"] = field;
//     if (field == "Planned Units") {
//       for (let result of results) {
//         let currWeek = moment(new Date(result.weekend)).week();
//         newObject[`W-${currWeek}`] = result.planned_units;
//         parsedData.push(newObject);
//       }
//     } else if (field == "Adjusted Units") {
//       for (let result of results) {
//         let currWeek = moment(new Date(result.weekend)).week();
//         newObject[`W-${currWeek}`] = result.adjusted_units;
//         parsedData.push(newObject);
//       }
//     } else {
//       for (let result of results) {
//         let currWeek = moment(new Date(result.weekend)).week();
//         newObject[`W-${currWeek}`] = result.forecasted_units;
//         parsedData.push(newObject);
//       }
//     }
//   }
//   parsedData.sort((a, b) => {
//     if (a.Comparision == b.Comparision) {
//     }
//   });
//   parsedData = [...new Set(parsedData)];
//   return parsedData;
// };

//API: Adjustment Unit & Sales Comparison
export const getAdjustmentUnitSalesComparison = async (req, res) => {
  try {
    let result = await prisma.$queryRaw(
      `SELECT * FROM morphe_staging.adjustment_influenced_metrics WHERE adjustment_id = ${req.params.id};`
    );
    let parsedData = {};
    parsedData["Units"] = parseCategoryUnitComparision(result);
    parsedData["Revenue"] = parseCategorySaleComparision(result);
    res.status(200).json({
      parsedData,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to Fetch Data",
      error: `${error}`,
    });
  }
};

export const activateAdjustmentAsBase = async (req, res) => {
  try {
    const isPartOfBase = await prisma.manual_adjustments.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        is_active: true,
      },
    });
    const whereIsbaseForecstFalse = await prisma.$queryRaw(
      `update morphe_staging.demand_forecast_run_log set is_base_forecast=false where is_base_forecast= true`
    );
    const whereIsbaseForecstTrue = await prisma.$queryRaw(
      `update morphe_staging.demand_forecast_run_log set is_base_forecast=true where manual_adjustment_id=${parseInt(
        req.params.id
      )} AND forecast_type='Adjustment' AND status='Completed'`
    );
    res.json({
      whereIsbaseForecstTrue,
      isPartOfBase,
    });
  } catch (error) {
    res.json({
      error: `something went activeMergedScenarioAsBase  ${error}.`,
    });
  }
};

export const AdjustmentStatus = async (req, res) => {
  try {
    const adjustments = await prisma.demand_forecast_run_log.findMany({
      where: {
        manual_adjustment_id: parseInt(req.params.id),
        is_base_forecast: true,
        forecast_type: "Adjustment",
      },
      select: {
        status: true,
        id: true,
      },
    });
    res.json({
      adjustment: adjustments[0],
    });
  } catch (error) {
    res.status(500).json({
      error: `something went wrong in check AdjustmentStatus status api. ${error}`,
    });
  }
};
