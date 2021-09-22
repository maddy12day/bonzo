import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getWeeklyChartData = async (req, res) => {
  try {
    const fact_sales_ending_inventory_sku_by_week = await prisma.fact_sales_ending_inventory_sku_by_week.findMany(
      {
        where: {
          id: 1,
        },
      }
    );

    res.status(200).json({
      fact_sales_ending_inventory_sku_by_week,
    });
  } catch (error) {
    res.status(500).json({
      message:
        "something went wrong in fact_sales_ending_inventory_sku_by_week api",
      error: `${error}`,
    });
  }
};

export const getWeeklyChartBaseData = async (req, res) => {
  try {
    const { forecasted_year } = req.params; 
    const plannedData = await prisma.$queryRaw(`SELECT round(sum(units), 0) as units, ROUND(sum(revenue), 2) as revenue from morphe_staging.planned_weekly_units_revenue_by_channel_by_sku pwurbcbs
                                                where YEAR(weekend_date) = ${forecasted_year}
                                                and channel <> 'Wholesale'
                                                group by WEEK(weekend_date) ;`);

    const thisYearData = await prisma.$queryRaw(`SELECT weekend, round(sum(unit_sales), 0) as units, ROUND(sum(revenue), 2) as revenue from morphe_staging.fact_sales_ending_inventory_sku_by_week pwurbcbs
                                                  where YEAR(weekend) = ${forecasted_year}
                                                  and channel <> 'Wholesale'
                                                  group by WEEK(weekend);`);

    const forecastData = await prisma.$queryRaw(`
                                            SELECT  
                                                wm.w01, 
                                                wm.w02, 
                                                wm.w03, 
                                                wm.w04, 
                                                wm.w05, 
                                                wm.w06, 
                                                wm.w07, 
                                                wm.w08, 
                                                wm.w09, 
                                                wm.w10, 
                                                wm.w11, 
                                                wm.w12, 
                                                wm.w13, 
                                                wm.w14, 
                                                wm.w15, 
                                                wm.w16, 
                                                wm.w17, 
                                                wm.w18, 
                                                wm.w19, 
                                                wm.w20, 
                                                wm.w21, 
                                                wm.w22, 
                                                wm.w23, 
                                                wm.w24, 
                                                wm.w25, 
                                                wm.w26, 
                                                wm.w27, 
                                                wm.w28, 
                                                wm.w29, 
                                                wm.w30, 
                                                wm.w31, 
                                                wm.w32, 
                                                wm.w33, 
                                                wm.w34, 
                                                wm.w35, 
                                                wm.w36, 
                                                wm.w37, 
                                                wm.w38, 
                                                wm.w39, 
                                                wm.w40, 
                                                wm.w41, 
                                                wm.w42, 
                                                wm.w43, 
                                                wm.w44, 
                                                wm.w45, 
                                                wm.w46, 
                                                wm.w47, 
                                                wm.w48, 
                                                wm.w49, 
                                                wm.w50, 
                                                wm.w51, 
                                                wm.w52
                                              from morphe_staging.forecasted_weekly_metrics wm, morphe_staging.demand_forecast_run_log dfrl  
                                              where 
                                              wm.metrics_name in ('units_sales', 'retail_sales') 
                                              and wm.demand_forecast_run_log_id = dfrl.id 
                                              and wm.forecast_year = ${forecasted_year}
                                              and dfrl.is_base_forecast = true;`);

    res.json({
      plannedData,
      thisYearData,
      forecastData,
    });
  } catch (error) {
    res.json({
      error: `some thing went wrong in the getWeeklyChartBaseData ${error}`,
    });
  }
};

export const getMonthlyChartBaseData = async (req, res) => {
  try {
    const { forecasted_year } = req.params; 
    const plannedData = await prisma.$queryRaw(`SELECT round(sum(units), 0) as units, ROUND(sum(revenue), 2) as revenue from morphe_staging.planned_weekly_units_revenue_by_channel_by_sku pwurbcbs
                                                where YEAR(weekend_date) = ${forecasted_year}
                                                and channel <> 'Wholesale'
                                                group by Month(weekend_date)`);

    const thisYearData = await prisma.$queryRaw(`SELECT weekend, round(sum(unit_sales), 0) as units, ROUND(sum(revenue), 2) as revenue from morphe_staging.fact_sales_ending_inventory_sku_by_week pwurbcbs
                                                  where YEAR(weekend) = ${forecasted_year}
                                                  and channel <> 'Wholesale'
                                                  group by Month(weekend);`);

    const forecastData = await prisma.$queryRaw(`
                                            SELECT  
                                            mm.jan,
                                            mm.feb,
                                            mm.mar,
                                            mm.apr,
                                            mm.may,
                                            mm.jun,
                                            mm.jul,
                                            mm.aug,
                                            mm.sep,
                                            mm.oct,
                                            mm.nov,
                                            mm.dec
                                              from morphe_staging.forecasted_monthly_metrics mm, morphe_staging.demand_forecast_run_log dfrl  
                                              where 
                                              mm.metrics_name in ('units_sales', 'retail_sales') 
                                              and mm.demand_forecast_run_log_id = dfrl.id 
                                              and mm.forecast_year = ${forecasted_year}
                                              and dfrl.is_base_forecast = true;`);

    res.json({
      plannedData,
      thisYearData,
      forecastData,
    });
  } catch (error) {
    res.json({
      error: `some thing went wrong in the getWeeklyChartBaseData ${error}`,
    });
  }
};
