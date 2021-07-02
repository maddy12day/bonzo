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
