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
      str2 += `dp.brand IN (${item[1]
        .map((str) => `'${str.trim()}'`)
        .join(",")}) AND `;
    } else if (item[0] == "filter_product_sources") {
      str2 += `(TRIM(dp.product_third_party)) IN (${item[1]
        .map((str) => `'${str.trim()}'`)
        .join(",")}) AND `;
    } else if (item[0] == "filter_brand_types") {
      str2 += `TRIM(dp.product_morphe_new_brand_3p) IN (
        ${item[1].map((str) => `'${str.trim()}'`).join(",")}) AND `;
    } else if (item[0] == "filter_life_cycles") {
      str2 += `dp.life_cycle IN (${item[1]
        .map((str) => `'${str.trim()}'`)
        .join(",")}) AND `;
    } else if (item[0] == "filter_newness") {
      item[1].map((str) => {
        if (str == "New") {
          return (str2 += `YEAR(dp.launch_date) >= YEAR(CURRENT_DATE()) AND `);
        } else {
          return (str2 += " YEAR(dp.launch_date) <= YEAR(CURRENT_DATE()) AND ");
        }
      });
    } else if (item[0] == "filter_sub_channels") {
      str2 += `${alias}.country IN (${item[1]
        .map((str) => `'${str.trim()}'`)
        .join(",")}) AND `;
    } else if (item[0] == "filter_channels") {
      str2 += `${alias}.channel IN (${item[1]
        .map((str) => `'${str.trim()}'`)
        .join(",")}) AND `;
    } else if (item[0] == "filter_programs") {
      str2 += ` dp.ns_product_subcollection IN (${item[1]
        .map((str) => `'${str.trim()}'`)
        .join(",")}) AND `;
    } else if (item[0] == "filter_classes") {
      str2 += ` dp.ns_class IN (${item[1]
        .map((str) => `'${str.trim()}'`)
        .join(",")}) AND `;
    } else if (item[0] == "filter_sub_classes") {
      str2 += ` dp.ns_subclass IN (${item[1]
        .map((str) => `'${str.trim()}'`)
        .join(",")}) AND `;
    } else if (item[0] == "filter_collections") {
      str2 += ` dp.ns_collection IN (${item[1]
        .map((str) => `'${str.trim()}'`)
        .join(",")}) AND `;
    } else if (item[0] == "filter_categories") {
      str2 += ` dp.ns_category IN (${item[1]
        .map((str) => `'${str.trim()}'`)
        .join(",")}) AND `;
    } else if (item[0] == "filter_skus") {
      str2 += `dp.SKU IN (${item[1]
        .map((str) => `'${str.trim()}'`)
        .join(",")}) AND `;
    } else {
      str2 += `${alias}.${item[0]} IN (${item[1]
        .map((str) => `'${str.trim()}'`)
        .join(",")}) AND `;
    }
  });
  return str2.slice(0, str2.length - 4);
};

export const getFilteredForecastData = async (req, res) => {
    delete req.body.filterType;
  try {
    const filteredForecastData = await prisma.$queryRaw(`WITH iskus AS (
      select
        distinct idfbwm.sku
      from
        morphe_staging.demand_forecast_base_weekly_metrics idfbwm,
        morphe_staging.dim_products idp
      where
        idfbwm.sku = idp.SKU
          AND ${whereQueryString( req.body,"idfbwm" ).replace(/dp/g,"idp")}
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
          AND ${whereQueryString(req.body,"dfbwm")}
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


const getMasterMetricData = async () => {
  try {
    const masterMetricData = await prisma.metrics_master.findMany({
      select: {
        name: true,
        title: true,
      },
    });
    return masterMetricData
  } catch (error) {
    return error
  }
};

const parseFilteredForecastData = (type, masterMetricData, filteredForecastData) => {
  let parsedData = []
  let typeIndex = type == "month" ? 12 : 52;

  for (let i = 0; i < filteredForecastData.length; i++) {
    var obj = {}
    if (masterMetricData[i]) {
      obj["Metrics Name"] = masterMetricData[i].title;
      for (let j = 0; j < typeIndex; j++) {
        let index = j + 1
        obj["w" + index] = filteredForecastData[j][`${masterMetricData[i].name}`]
      }
      parsedData.push(obj)
    }
  }
  return parsedData;
}

export const getFilteredForecastMetrics = async (req, res) => {
  let duration = req.body.filterType;
  delete req.body.filterType;
  try {
    let whereStringDfbwm = whereQueryString(req.body, "dfbwm");
    let whereStringDfbwmValue = whereStringDfbwm ? whereStringDfbwm : "";
    let dfbwm2 = whereStringDfbwm ?
      ` AND ${whereStringDfbwm
        .replace(/dp./g, "dp2.")
        .replace(/dfbwm./g, "dfbwm2.")}` :
      "";
    let demand_forecast_run_log_id = 1;
    let transaction_db = "morphe_staging";

    let query = `SELECT
              ${duration}(dfbwm.weekend) AS date,
              ROUND(SUM(dfbwm.retail_sales), 0) AS total_revenue,
              ROUND(SUM(dfbwm.units_sales), 0) AS total_units,
              (CASE
                WHEN (dfbwm.weekend>(
                SELECT
                  dmrw.weekend
                FROM
                  ${transaction_db}.dim_morphe_retail_weekends dmrw
                WHERE
                  dmrw.year = YEAR(CURRENT_DATE())
                LIMIT 1)) THEN ROUND( SUM(dfbwm.units_sales) / (SELECT SUM(dfbwm2.units_sales) FROM ${transaction_db}.demand_forecast_base_weekly_metrics dfbwm2, ${transaction_db}.dim_products dp2 
                WHERE dfbwm2.weekend = DATE_SUB(dfbwm.weekend, INTERVAL 7 DAY) AND dfbwm2.demand_forecast_run_log_id = dfrl.id
                AND dp2.sku = dfbwm2.sku
                ${dfbwm2}
               ), 2)
                ELSE 1
              END) AS units_sales_build,
              (CASE
                WHEN (dfbwm.weekend>(
                SELECT
                  dmrw.weekend
                FROM
                  ${transaction_db}.dim_morphe_retail_weekends dmrw
                WHERE
                  dmrw.year = YEAR(CURRENT_DATE())
                LIMIT 1)) THEN ROUND( SUM(dfbwm.retail_sales) / (SELECT SUM(dfbwm2.retail_sales) FROM ${transaction_db}.demand_forecast_base_weekly_metrics dfbwm2, ${transaction_db}.dim_products dp2
                WHERE
                 dfbwm2.weekend = DATE_SUB(dfbwm.weekend, INTERVAL 7 DAY) 
                 AND dfbwm2.demand_forecast_run_log_id = dfrl.id 
                 AND dp2.sku = dfbwm2.sku
                ${dfbwm2}
                 ), 2)
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
              ${transaction_db}.demand_forecast_base_weekly_metrics dfbwm,
              ${transaction_db}.demand_forecast_run_log dfrl,
              ${transaction_db}.dim_products dp 
            WHERE
              YEAR(dfbwm.weekend)=(YEAR(CURRENT_DATE()))
              AND dfrl.id = ${demand_forecast_run_log_id}
              AND dfrl.id = dfbwm.demand_forecast_run_log_id
              AND dp.SKU = dfbwm.sku
              AND
              ${whereStringDfbwmValue}
            GROUP BY
             ${duration}(dfbwm.weekend);`

    const filteredForecastData = await prisma.$queryRaw(query);
    let masterMetricData = await getMasterMetricData();
    let parsedFilteredForecastData = parseFilteredForecastData(duration, masterMetricData, filteredForecastData)
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