import { PrismaClient } from "@prisma/client";
import { parseCategorySaleComparision, parseCategoryUnitComparision } from "../controller/scenario";
// import moment from "moment";


const prisma = new PrismaClient();

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
    res.status(200).json({
      adjustments,
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
        year: "2021",
      },
      select: {
        weekend: true,
      },
    });
    res.status(200).json({
      weekends: weekends.map((item) => item.weekend.toISOString().split("T")[0]),
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
    const manualAjustment = await prisma.manual_adjustments.create({
      data: {
        ...req.body,
      },
    });
    const executed_by = await prisma.users.findUnique({
      where: {
        id: req.body.adjusted_by_user_id,
      },
    });
    const demandForecastRunlogRes = await prisma.demand_forecast_run_log.create({
      data: {
        is_base_forecast: false,
        demand_planner_user_id: req.body.adjusted_by_user_id,
        manual_adjustment_id: manualAjustment.id,
        ma_source_scenario_id: 0,
        status: "Pending",
        forecast_type: "Adjustment",
        executed_by: `${executed_by.first_name} ${executed_by.last_name}`,
      },
    });
    res.json({
      manualAjustment,
      message: "adjustment created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong in getWeekendDates api",
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
    const result = await prisma.$queryRaw(`SELECT * from morphe_staging.adjustment_influenced_leveled_metrics WHERE adjustment_id = ${req.params.id};`);
    let parsedData = {};
    parsedData["Units"] = parseCategoryUnitComparision(result);
    parsedData["Revenue"] = parseCategorySaleComparision(result);

    res.status(200).json({
      parsedData, result
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
    const result = await prisma.$queryRaw(`SELECT * from morphe_staging.adjustment_influenced_leveled_aggregates WHERE adjustment_id = ${req.params.id} AND level = "CATEGORY";`);
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
  try{
    const weekends = await prisma.dim_morphe_retail_weekends.findMany({
     where: {
     year: "2021"
     },
     select: {
       weekend: true
     },
    })

    return weekends;
    
  }catch(error) {
    return error;
  }
}


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
    let result = await prisma.$queryRaw(`SELECT * FROM morphe_staging.adjustment_influenced_metrics WHERE adjustment_id = ${req.params.id};`);
    let parsedData = {};
    // let weekendDates = await getWeekendDate();
    // console.log(moment(new Date("2021-11-26T00:00:00.000Z")).week(),"weekendDates--");
    
    // parsedData["Units"] = parseCategoryUnitComparision(result);
    // parsedData["Revenue"] = parseCategorySaleComparision(result);
    res.status(200).json({
      parsedData,result
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to Fetch Data",
      error: `${error}`,
    });
  }
};
