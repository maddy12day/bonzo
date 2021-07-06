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

// function for returning the where condition query parameters
const whereQueryString = (obj, alias = "fseisbw") => {
  let str2 = "";
  Object.entries(obj).map((item) => {
    if (item[0] == "filter_brands") {
      str2 += `dp.brand IN (${item[1].map((str) => `'${str.trim()}'`).join(",")}) AND `;
    } else if (item[0] == "filter_product_sources") {
      str2 += `(TRIM(dp.product_third_party)) IN (${item[1].map((str) => `'${str.trim()}'`).join(",")}) AND `;
    } else if (item[0] == "filter_brand_types") {
      str2 += `TRIM(dp.product_morphe_new_brand_3p) IN (
        ${item[1].map((str) => `'${str.trim()}'`).join(",")}) AND `;
    } else if (item[0] == "filter_life_cycles") {
      str2 += `dp.life_cycle IN (${item[1].map((str) => `'${str.trim()}'`).join(",")}) AND `;
    } else if (item[0] == "filter_newness") {
      item[1].map((str) => {
        if (str == "New") {
          return (str2 += `YEAR(dp.launch_date) >= YEAR(CURRENT_DATE()) AND `);
        } else {
          return (str2 += " YEAR(dp.launch_date) <= YEAR(CURRENT_DATE()) AND ");
        }
      });
    } else if (item[0] == "filter_sub_channels") {
      str2 += `${alias}.country IN (${item[1].map((str) => `'${str.trim()}'`).join(",")}) AND `;
    } else if (item[0] == "filter_channels") {
      str2 += `${alias}.channel IN (${item[1].map((str) => `'${str.trim()}'`).join(",")}) AND `;
    } else if (item[0] == "filter_programs") {
      str2 += ` dp.ns_product_subcollection IN (${item[1].map((str) => `'${str.trim()}'`).join(",")}) AND `;
    } else if (item[0] == "filter_classes") {
      str2 += ` dp.ns_class IN (${item[1].map((str) => `'${str.trim()}'`).join(",")}) AND `;
    } else if (item[0] == "filter_sub_classes") {
      str2 += ` dp.ns_subclass IN (${item[1].map((str) => `'${str.trim()}'`).join(",")}) AND `;
    } else if (item[0] == "filter_collections") {
      str2 += ` dp.ns_collection IN (${item[1].map((str) => `'${str.trim()}'`).join(",")}) AND `;
    } else if (item[0] == "filter_categories") {
      str2 += ` dp.ns_category IN (${item[1].map((str) => `'${str.trim()}'`).join(",")}) AND `;
    } else if (item[0] == "filter_skus") {
      str2 += `dp.SKU IN (${item[1].map((str) => `'${str.trim()}'`).join(",")}) AND `;
    } else {
      str2 += `${alias}.${item[0]} IN (${item[1].map((str) => `'${str.trim()}'`).join(",")}) AND `;
    }
  });
  return str2.slice(0, str2.length - 4);
};

export const getFilteredForecastData = async (req, res) => {
  let transaction_db = "morphe_staging";
  delete req.body.filterType;
  try {
    let query = `
                WITH iskus AS (
                  select
                    idfbwm.sku as sku,
                    sum(idfbwm.units_sales) as unit_sales
                  from
                    ${transaction_db}.demand_forecast_base_weekly_metrics idfbwm
                  where
                    idfbwm.demand_forecast_run_log_id = (select id from ${transaction_db}.demand_forecast_run_log dfrl where is_base_forecast = true limit 1)
                    and idfbwm.sku in (
                      select
                        idp.SKU
                      from
                        ${transaction_db}.dim_products idp
                      where
                        ${whereQueryString(req.body, "idfbwm").replace(/dp/g, "idp")})
                  group by 1
                  order by 2 desc
                  limit 10)
                SELECT
                  dfbwm.sku AS sku,
                  dp.title AS title,
                  dfbwm.weekend AS weekend,
                  ROUND(SUM(dfbwm.retail_sales), 0) AS retail_sales,
                  SUM(dfbwm.units_sales) AS units_sales,
                  ROUND((SUM(dfbwm.retail_sales) / SUM(dfbwm.units_sales)), 2) AS aur
                FROM
                  ${transaction_db}.demand_forecast_base_weekly_metrics dfbwm,
                  ${transaction_db}.dim_products dp
                WHERE
                  demand_forecast_run_log_id = (select id from ${transaction_db}.demand_forecast_run_log dfrl where is_base_forecast = true limit 1)
                  AND dfbwm.sku = dp.SKU
                  AND dfbwm.sku IN (
                    select
                      sku
                    from
                      iskus)
                GROUP BY
                  dfbwm.sku,
                  dfbwm.weekend
                ORDER BY
                  dfbwm.sku,
                  dfbwm.weekend;`;

    const filteredForecastData = await prisma.$queryRaw(query);
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

const getMasterMetricData = async () => {
  try {
    const masterMetricData = await prisma.metrics_master.findMany({
      select: {
        name: true,
        title: true,
      },
    });
    return masterMetricData;
  } catch (error) {
    return error;
  }
};

const parseFilteredForecastData = (type, masterMetricData, filteredForecastData) => {
  let parsedData = [];
  let typeIndex = type == "month" ? 12 : 52;

  for (let i = 0; i < filteredForecastData.length; i++) {
    var obj = {};
    if (masterMetricData[i]) {
      obj["Metrics Name"] = masterMetricData[i].title;
      for (let j = 0; j < typeIndex; j++) {
        let index = j + 1;
        obj["w" + index] = filteredForecastData[j][`${masterMetricData[i].name}`];
      }
      parsedData.push(obj);
    }
  }
  return parsedData;
};

export const getFilteredForecastMetrics = async (req, res) => {
  let duration = req.body.filterType;
  delete req.body.filterType;
  try {
<<<<<<< HEAD
    console.log(whereQueryString(req.body, "idp"), "req.body--", whereQueryString(req.body, "idp").replace(/dp/g, "idp"));
=======
>>>>>>> origin/feature/scenario-fixes
    let transaction_db = "morphe_staging";

    let query = `
                WITH current_base_forecast_run_log_id AS (
                select
                  id
                from
                  ${transaction_db}.demand_forecast_run_log dfrl
                where
                  is_base_forecast = true
                limit 1 ),
                iskus AS (
                select
                  idp.SKU as sku
                from
                  ${transaction_db}.dim_products idp
                where
                  ${whereQueryString(req.body, "idp").replace(/dp/g, "idp")} ),
                comp_units_revs AS (
                SELECT
                  ${duration}(dfbwm2.weekend)-1 AS cur_date,
                  SUM(dfbwm2.units_sales) as cur_unit_sales,
                  SUM(dfbwm2.retail_sales) as cur_retail_sales
                FROM
                  ${transaction_db}.demand_forecast_base_weekly_metrics dfbwm2
                WHERE
                  dfbwm2.demand_forecast_run_log_id = (
                  select
                    id
                  from
                    current_base_forecast_run_log_id)
                  AND dfbwm2.sku IN (
                  select
                    sku
                  from
                    iskus)
                GROUP BY
                  ${duration}(dfbwm2.weekend) ),
                first_weekend AS (
                SELECT
                  dmrw.weekend as w01
                FROM
                  ${transaction_db}.dim_morphe_retail_weekends dmrw
                WHERE
                  dmrw.year = YEAR(CURRENT_DATE())
                LIMIT 1 )
                SELECT
                  ${duration}(dfbwm.weekend) AS date,
                  ROUND(SUM(dfbwm.retail_sales), 0) AS retail_sales,
                  ROUND(SUM(dfbwm.units_sales), 0) AS units_sales,
                  (CASE
                    WHEN (dfbwm.weekend>(
                    select
                      w01
                    from
                      first_weekend)) THEN ROUND( SUM(dfbwm.units_sales) / (select cur.cur_unit_sales from comp_units_revs cur where cur.cur_date = ${duration}(dfbwm.weekend)), 2)
                    ELSE 1
                  END) AS units_sales_build,
                  (CASE
                    WHEN (dfbwm.weekend>(
                    select
                      w01
                    from
                      first_weekend)) THEN ROUND( SUM(dfbwm.retail_sales) / (select cur.cur_retail_sales from comp_units_revs cur where cur.cur_date = ${duration}(dfbwm.weekend)), 2)
                    ELSE 1
                  END) AS retail_sales_build,
                  ROUND((ROUND(SUM(dfbwm.retail_sales), 0) / ROUND(SUM(dfbwm.units_sales), 0)), 2) AS aur,
                  ROUND(SUM(dfbwm.gm), 0) AS gm,
                  ROUND(((ROUND(SUM(dfbwm.gm), 2) / ROUND(SUM(dfbwm.retail_sales), 2))* 100), 2) AS gm_percent,
                  ROUND(AVG(dfbwm.wos), 2) AS wos,
                  ROUND(((ROUND(SUM(dfbwm.units_sales), 0) / ROUND(SUM(dfbwm.receipt_units), 0))* 100), 2) AS sell_through,
                  ROUND(SUM(dfbwm.inventory_ins_units), 0) AS inventory_ins_units,
                  ROUND(SUM(dfbwm.inventory_ins_cost), 0) AS inventory_ins_cost,
                  ROUND(SUM(dfbwm.inventory_dc_units), 0) AS inventory_dc_units,
                  ROUND(SUM(dfbwm.inventory_dc_cost), 0) AS inventory_dc_cost,
                  ROUND(SUM(dfbwm.receipt_units), 0) AS receipt_units,
                  ROUND(SUM(dfbwm.receipt_cost), 0) AS receipt_cost,
                  ROUND(AVG(dfbwm.aps), 2) AS aps
                FROM
                  ${transaction_db}.demand_forecast_base_weekly_metrics dfbwm
                WHERE
                  YEAR(dfbwm.weekend)=(YEAR(CURRENT_DATE()))
                  AND dfbwm.demand_forecast_run_log_id = (
                  select
                    id
                  from
                    current_base_forecast_run_log_id)
                  AND dfbwm.sku IN (
                  select
                    sku
                  from
                    iskus)
                GROUP BY
                  ${duration}(dfbwm.weekend);`;

    const filteredForecastData = await prisma.$queryRaw(query);
    let masterMetricData = await getMasterMetricData();
    let parsedFilteredForecastData = parseFilteredForecastData(duration, masterMetricData, filteredForecastData);
    res.status(200).json({
      parsedFilteredForecastData,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to Fetch Filtered Forecast Data",
      error: `${error}`,
    });
  }
};

// Planned Query Generator
const typlanQueryGeneratorByDurations = (duration, whereQueryString, transaction_db) => {
  let dateOffset;
  let tableName;
  let groubyCol;
  let whereQueryStr = "";
  duration.toLowerCase() == "week"
    ? ((dateOffset = 1), (tableName = `planned_weekly_units_revenue_by_channel_by_sku`), (groubyCol = "week"))
    : ((dateOffset = 0), (tableName = `planned_monthly_units_revenue_by_channel_by_sku`), (groubyCol = "month"));
  if (whereQueryString) {
    whereQueryStr = `${whereQueryString.replace(/country/g, "sub_channel")}`;
  }

  const query = `
              SELECT
                ${duration}(pwurbcbs.${groubyCol}end_date)-${dateOffset} AS date,
                ROUND(SUM(pwurbcbs.units), 0) AS total_units,
                ROUND(SUM(pwurbcbs.revenue), 0) AS total_revenue
              FROM
                ${transaction_db}.${tableName} pwurbcbs
              WHERE
                pwurbcbs.channel <> 'Wholesale'
                AND pwurbcbs.sku in (
                select
                  SKU
                from
                  ${transaction_db}.dim_products dp
                where
                  ${whereQueryStr})
              GROUP BY
                ${duration}(pwurbcbs.${groubyCol}end_date)`;
  return query;
};

// This Year Sale Query Generator
const thisYearSaleYearlyQuarterly = (duration, whereQueryString, numofYear, transaction_db) => {
  let dateOffset;
  let whereQueryStr = "";
  if (whereQueryString) {
    whereQueryStr = ` ${whereQueryString}`;
  }
  duration.toLowerCase() == "week" ? (dateOffset = 1) : (dateOffset = 0);
  const query = `
                SELECT
                  ${duration}(fseisbw.weekend)-${dateOffset} AS date,
                  IFNULL(SUM(fseisbw.unit_sales), 0) AS total_units,
                  IFNULL(ROUND(SUM(fseisbw.revenue), 0), 0) AS total_revenue
                FROM
                  ${transaction_db}.fact_sales_ending_inventory_sku_by_week fseisbw
                WHERE
                  YEAR(fseisbw.weekend)=(YEAR(CURRENT_DATE())-${numofYear})
                  AND fseisbw.channel <> 'Wholesale'
                  AND fseisbw.sku IN (
                  select
                    SKU
                  from
                    ${transaction_db}.dim_products dp
                  where
                    ${whereQueryStr} )
                GROUP BY
                  ${duration}(fseisbw.weekend)
                ORDER BY
                  ${duration}(fseisbw.weekend);`;
  return query;
};

// Forecast Query Generator
const forecastQueryGenByDuration = (duration, whereQueryString, numofYear, transaction_db) => {
  // let changeAlias = whereQueryString ? `AND ${whereQueryString}` : "";
  const query = `
              SELECT
                ${duration}(fseisbw.weekend) AS date,
                IFNULL( ROUND(SUM(fseisbw.retail_sales), 2), 0) AS total_revenue,
                IFNULL( ROUND(SUM(fseisbw.units_sales), 0), 0) AS total_units
              FROM
                ${transaction_db}.demand_forecast_base_weekly_metrics fseisbw
              WHERE
                YEAR(fseisbw.weekend)=(YEAR(CURRENT_DATE())+ ${numofYear})
                AND fseisbw.channel <> 'Wholesale'
                AND fseisbw.demand_forecast_run_log_id = (
                        select
                          id
                        from
                          ${transaction_db}.demand_forecast_run_log
                        where
                          is_base_forecast = true
                        limit 1)
                AND fseisbw.sku IN (
                        select
                          dp.SKU
                        from
                          ${transaction_db}.dim_products dp
                        where
                          ${whereQueryString})
              GROUP BY
                ${duration}(fseisbw.weekend)
              ORDER BY
                ${duration}(fseisbw.weekend);`;
  return query;
};

// Filtered Stats getFilteredYearlyStatsData
export const getFilteredYearlyStatsData = async (req, res) => {
  delete req.body.filterType;
  let filter = req.body;

  // Planned Sales Yearly
  const filteredPlannedWhereQuery = whereQueryString(filter, "pwurbcbs");
  const filteredPlannedDataQuery = typlanQueryGeneratorByDurations("YEAR", filteredPlannedWhereQuery, "morphe_staging");

  // This Year Sale Yearly
  const filteredThisYearSaleWhereQuery = whereQueryString(filter);
  const filteredThisYearSaleDataQuery = thisYearSaleYearlyQuarterly("YEAR", filteredThisYearSaleWhereQuery, 0, "morphe_staging");

  // Forecast Yearly
  const filteredForecastWhereQuery = whereQueryString(filter);
  const filteredForecastDataQuery = forecastQueryGenByDuration("YEAR", filteredForecastWhereQuery, 0, "morphe_staging");

  // // Planned Quarterly
  // const filteredQuarterlyPlannedWhereQuery = whereQueryString(filter, "pwurbcbs");
  // const filteredQuarterlyPlannedDataQuery = typlanQueryGeneratorByDurations("QUARTER", filteredQuarterlyPlannedWhereQuery, "morphe_staging");

  // // This Year Quarterly
  // const filteredQuarterlyThisYearSaleWhereQuery = whereQueryString(filter);
  // const filteredQuarterlyThisYearSaleDataQuery = thisYearSaleYearlyQuarterly("QUARTER", filteredQuarterlyThisYearSaleWhereQuery, 0, "morphe_staging");

  // // Forecast Quarterly
  // const filteredQuarterlyForecastWhereQuery = whereQueryString(filter);
  // const filteredQuarterlyForecastDataQuery = forecastQueryGenByDuration("QUARTER", filteredQuarterlyForecastWhereQuery, 0, "morphe_staging", 1);

  try {
    let yearlyFilteredStats = await Promise.allSettled([
      prisma.$queryRaw(filteredPlannedDataQuery),
      prisma.$queryRaw(filteredThisYearSaleDataQuery),
      prisma.$queryRaw(filteredForecastDataQuery),
    ]);

    // let quarterlyFilteredStats = await Promise.allSettled([
    //   prisma.$queryRaw(filteredQuarterlyPlannedDataQuery),
    //   prisma.$queryRaw(filteredQuarterlyThisYearSaleDataQuery),
    //   prisma.$queryRaw(filteredQuarterlyForecastDataQuery),
    // ]);

    let filteredStats = {
      yearlyFilteredStats: yearlyFilteredStats.map((item) => item.value),
      quarterlyFilteredStats: {}, //quarterlyFilteredStats.map((item) => item.value),
    };
    res.status(200).json({
      filteredStats,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to Fetch Filtered Forecast Data",
      error: `${error}`,
    });
  }
};

// Filtered Stats getFilteredYearlyStatsData
export const getFilteredQuarterlyStatsData = async (req, res) => {
  delete req.body.filterType;
  let filter = req.body;

  // // Planned Sales Yearly
  // const filteredPlannedWhereQuery = whereQueryString(filter, "pwurbcbs");
  // const filteredPlannedDataQuery = typlanQueryGeneratorByDurations("YEAR", filteredPlannedWhereQuery, "morphe_staging");

  // // This Year Sale Yearly
  // const filteredThisYearSaleWhereQuery = whereQueryString(filter);
  // const filteredThisYearSaleDataQuery = thisYearSaleYearlyQuarterly("YEAR", filteredThisYearSaleWhereQuery, 0, "morphe_staging");

  // // Forecast Yearly
  // const filteredForecastWhereQuery = whereQueryString(filter);
  // const filteredForecastDataQuery = forecastQueryGenByDuration("YEAR", filteredForecastWhereQuery, 0, "morphe_staging");

  // Planned Quarterly
  const filteredQuarterlyPlannedWhereQuery = whereQueryString(filter, "pwurbcbs");
  const filteredQuarterlyPlannedDataQuery = typlanQueryGeneratorByDurations("QUARTER", filteredQuarterlyPlannedWhereQuery, "morphe_staging");

  // This Year Quarterly
  const filteredQuarterlyThisYearSaleWhereQuery = whereQueryString(filter);
  const filteredQuarterlyThisYearSaleDataQuery = thisYearSaleYearlyQuarterly("QUARTER", filteredQuarterlyThisYearSaleWhereQuery, 0, "morphe_staging");

  // Forecast Quarterly
  const filteredQuarterlyForecastWhereQuery = whereQueryString(filter);
  const filteredQuarterlyForecastDataQuery = forecastQueryGenByDuration("QUARTER", filteredQuarterlyForecastWhereQuery, 0, "morphe_staging");

  try {
    // let yearlyFilteredStats = await Promise.allSettled([
    //   prisma.$queryRaw(filteredPlannedDataQuery),
    //   prisma.$queryRaw(filteredThisYearSaleDataQuery),
    //   prisma.$queryRaw(filteredForecastDataQuery),
    // ]);

    let quarterlyFilteredStats = await Promise.allSettled([
      prisma.$queryRaw(filteredQuarterlyPlannedDataQuery),
      prisma.$queryRaw(filteredQuarterlyThisYearSaleDataQuery),
      prisma.$queryRaw(filteredQuarterlyForecastDataQuery),
    ]);

    let filteredStats = {
      yearlyFilteredStats: {}, //yearlyFilteredStats.map((item) => item.value),
      quarterlyFilteredStats: quarterlyFilteredStats.map((item) => item.value),
    };
    res.status(200).json({
      filteredStats,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to Fetch Filtered Forecast Data",
      error: `${error}`,
    });
  }
};
