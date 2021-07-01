import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const weeklyCommonTableDataMapping = (data) => {
  const skus = data.map((item) => item.sku);
  const titles = data.map((item) => item.title);
  let uniqueSkus = [...new Set(skus)];
  let uniqueSkusTitle = [...new Set(titles)];
  let counter = uniqueSkus.length <= 10 ? uniqueSkus.length : 10;
  const finalData = [];
  for (let i = 0; i < counter; i++) {
    let arr = data.filter((item) => item.sku == uniqueSkus[i] && item.title == uniqueSkusTitle[i]);
    finalData.push({
      sku: uniqueSkus[i],
      title: uniqueSkusTitle[i],
      data: arr,
    });
  }
  return finalData;
};

export const getFilteredForecastData = async (req, res) => {
  try {
    const filteredForecastData = await prisma.$queryRaw(`WITH iskus AS (
      select
        distinct idfbwm.sku
      from
        morphe_staging.demand_forecast_base_weekly_metrics idfbwm,
        morphe_staging.dim_products idp
      where
        idfbwm.sku = idp.SKU
        and demand_forecast_run_log_id = 1
      order by
        idfbwm.units_sales desc
      limit 10)
      SELECT
        dfbwm.sku as sku,
        dp.title as title,
        dfbwm.weekend as weekend,
        ROUND(SUM(dfbwm.retail_sales), 0) AS retail_sales,
        SUM(dfbwm.units_sales) AS units_sales,
        ROUND((SUM(dfbwm.retail_sales) / SUM(dfbwm.units_sales)), 2) AS aur
      FROM
        morphe_staging.demand_forecast_base_weekly_metrics dfbwm,
        morphe_staging.dim_products dp
      WHERE
        demand_forecast_run_log_id = 1
        AND dfbwm.sku IN (
        select
          sku
        from
          iskus)
        AND dfbwm.sku = dp.SKU
      GROUP BY
        dfbwm.sku,
        dfbwm.weekend
      ORDER BY
        dfbwm.sku,
        dfbwm.weekend;`);

    let parsedWeeklyData = weeklyCommonTableDataMapping(filteredForecastData);
    res.status(200).json({
      parsedWeeklyData,
    });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong in baseQuarterlyPlanned api",
      error: `${error}`,
    });
  }
};
