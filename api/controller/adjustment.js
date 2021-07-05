import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// get Base Adjustments
export const getBaseAdjustments = async (req, res) => {
  try {
    const adjustments = await prisma.manual_adjustments.findMany({
      where: {
        filter_level: "baseVersion"
      },
      orderBy: {
        created_at: 'desc'
      }
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
  try{
    const weekends = await prisma.dim_morphe_retail_weekends.findMany({
     where: {
     year: "2021"
     },
     select: {
       weekend: true
     },
    })
    console.log(weekends)
    res.status(200).json({
      weekends: weekends.map(item => item.weekend.toISOString().split('T')[0])
    })
  }catch(error) {
    res.status(500).json({
      message: "something went wrong in getWeekendDates api",
      error: `${error}`,
    });
  }
}

export const createManualAdjustment = async (req, res) => {
  try{
    console.log(req.body)
    const manualAjustment = await prisma.manual_adjustments.create({
      data: {
        ...req.body      
      }
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
      message: "adjustment created successfully"
    })
  }catch(error) {
    res.status(500).json({
      message: "something went wrong in getWeekendDates api"
    })
    }
  }



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



// Get Adjustment Sales Summary 
// Paramenter Passed: Adjustment ID
export const getAdjustmentSalesSummary = async (req, res) => {
  console.log("req.params.id--", req.params.id);
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