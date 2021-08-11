import { PrismaClient } from "@prisma/client";
import { getMasterMetricData } from "./forecast";

const prisma = new PrismaClient();

export const getBaseWeeklyMetrics = async (req, res) => {
  try {
    const { forecast_year } = req.params;
    const demandForecastRunLog = await prisma.demand_forecast_run_log.findMany({
      where: {
        is_base_forecast: true,
      },
      select: {
        id: true,
      },
    });
    let forecastedWeeklyMetrics = await prisma.forecasted_weekly_metrics.findMany(
      {
        where: {
          demand_forecast_run_log_id: demandForecastRunLog[0].id,
          forecast_year: forecast_year
        },
        include: {
          metrics_master: {
            select: {
              title: true,
            },
          },
        },
      }
    );

    forecastedWeeklyMetrics = forecastedWeeklyMetrics.filter(
      (obj) =>
        obj.metrics_name !== "aps" &&
        obj.metrics_name !== "inventory_dc_units" &&
        obj.metrics_name !== "inventory_dc_cost"
    );

    const baseWeeklyMetrics = JSON.stringify(
      forecastedWeeklyMetrics,
      (key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
    );
    res.status(200).json({
      baseWeeklyMetrics,
    });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong in weekly metrics api",
      error: `${error}`,
    });
  }
};
export const getBaseMonthlyMetrics = async (req, res) => {
  try {
    const { forecast_year } = req.params;
    const demandForecastRunLog = await prisma.demand_forecast_run_log.findMany({
      where: {
        is_base_forecast: true,
      },
      select: {
        id: true,
      },
    });
    let forecastedMonthlyMetrics = await prisma.forecasted_monthly_metrics.findMany(
      {
        where: {
          demand_forecast_run_log_id: demandForecastRunLog[0].id,
          forecast_year: forecast_year
        },
        include: {
          metrics_master: {
            select: {
              title: true,
            },
          },
        },
      }
    );

    forecastedMonthlyMetrics = forecastedMonthlyMetrics.filter(
      (obj) =>
        obj.metrics_name !== "aps" &&
        obj.metrics_name !== "inventory_dc_units" &&
        obj.metrics_name !== "inventory_dc_cost"
    );

    const baseMonthlyMetrics = JSON.stringify(
      forecastedMonthlyMetrics,
      (key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
    );
    res.status(200).json({
      baseMonthlyMetrics,
    });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong in monthly metrics api",
      error: `${error}`,
    });
  }
};

export const getBaseYearlyQarterlyForecast = async (req, res) => {
  try {
    const  { forecast_year }  = req.params;
    const demandForecastRunLog = await prisma.demand_forecast_run_log.findMany({
      where: {
        is_base_forecast: true,
      },
      select: {
        id: true,
      },
    });
    const forecastedYearlyQuarterlyForecast = await prisma.forecasted_weekly_metrics.findMany(
      {
        where: {
          demand_forecast_run_log_id: demandForecastRunLog[0].id,
          forecast_year: forecast_year,
          metrics_name: {
            in: ["retail_sales", "units_sales"],
          },
         
        },
        select: {
          yearly_aggregate: true,
          q1_aggregate: true,
          q2_aggregate: true,
          q3_aggregate: true,
          q4_aggregate: true,
        },
      }
    );
    const baseYQForecast = JSON.stringify(
      forecastedYearlyQuarterlyForecast,
      (key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
    );
    res.status(200).json({
      baseYQForecast,
    });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong in monthly metrics api",
      error: `${error}`,
    });
  }
};
export const getBaseYearlyPlanned = async (req, res) => {
  try {
    const baseYearlyPlanned = await prisma.planned_weekly_units_revenue_by_channel_by_sku.groupBy(
      {
        by: ["plan_year"],
        where: {
          plan_year: "2021",
          channel: { in: ["Ecomm", "Retail"] },
        },
        _sum: {
          units: true,
          revenue: true,
        },
      }
    );

    res.status(200).json({
      baseYearlyPlanned,
    });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong in baseYearlyPlanned api",
      error: `${error}`,
    });
  }
};

export const getBaseQuarterlyPlanned = async (req, res) => {
  try {
    const baseQuarterlyPlanned = await prisma.$queryRaw(`SELECT QUARTER(weekend_date) AS qtr, ROUND(SUM(revenue),0) AS qtr_revenue, ROUND(SUM(units),0) AS qtr_units
                                                        FROM morphe_staging.planned_weekly_units_revenue_by_channel_by_sku
                                                        WHERE weekend_date BETWEEN '2021-01-01' AND '2021-12-31'
                                                        GROUP BY QUARTER(weekend_date);`);

    res.status(200).json({
      baseQuarterlyPlanned,
    });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong in baseQuarterlyPlanned api",
      error: `${error}`,
    });
  }
};

export const getBaseThisQuarterlySale = async (req, res) => {
  try {
    const baseQuarterlySale = await prisma.$queryRaw(`SELECT 
                                                        QUARTER(weekend) AS qtr, 
                                                        ROUND(SUM(revenue),0) AS qtr_revenue, 
                                                        ROUND(SUM(unit_sales),0) AS qtr_units
                                                      FROM morphe_staging.fact_sales_ending_inventory_sku_by_week fseisbw 
                                                      WHERE 
                                                        weekend BETWEEN '2021-01-01' AND '2021-12-31'
                                                        AND fseisbw.sku IN (select sku from morphe_staging.planned_weekly_units_revenue_by_channel_by_sku)
                                                      GROUP BY 
                                                        QUARTER(weekend);`);

    res.status(200).json({
      baseQuarterlySale,
    });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong in baseQuarterlyPlanned api",
      error: `${error}`,
    });
  }
};
export const getBaseThisYearlySale = async (req, res) => {
  try {
    // const baseYearlySale = await prisma.$queryRaw(`SELECT
    //                                                 Year(weekend) AS qtr,
    //                                                 ROUND(SUM(revenue),0) AS qtr_revenue,
    //                                                 ROUND(SUM(unit_sales),0) AS qtr_units
    //                                               FROM morphe_staging.fact_sales_ending_inventory_sku_by_week fseisbw
    //                                               WHERE
    //                                                 weekend BETWEEN '2021-01-01' AND '2021-12-31'
    //                                                 AND fseisbw.sku IN (select sku from morphe_staging.planned_weekly_units_revenue_by_channel_by_sku)
    //                                               GROUP BY
    //                                                 Year(weekend);`);

    const baseYearlySale = await prisma.$queryRaw(`SELECT 
                                                    Year(weekend) AS qtr, 
                                                    ROUND(SUM(revenue),0) AS qtr_revenue, 
                                                    ROUND(SUM(unit_sales),0) AS qtr_units
                                                  FROM morphe_staging.fact_sales_ending_inventory_sku_by_week fseisbw 
                                                  WHERE 
                                                    year(weekend) = year(CURRENT_TIMESTAMP) AND fseisbw.channel <> 'Wholesale'
                                                  GROUP BY 
                                                    Year(weekend);`);
    res.status(200).json({
      baseYearlySale,
    });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong in baseQuarterlyPlanned api",
      error: `${error}`,
    });
  }
};

export const getWeekends = async (req, res) => {
  const weekends = await prisma.$queryRaw(`SELECT weekend from morphe_staging.dim_morphe_retail_weekends dmrw 
                                 where Year in (year(CURRENT_DATE()), year(CURRENT_DATE())+1)
                                 and weekend >= CURRENT_DATE() `);
  res.json({
    weekends: weekends.map(item => moment(item).format('YYYY-MM-DD')),
  });
};
