import { PrismaClient } from "@prisma/client";
import moment from "moment";

const prisma = new PrismaClient();

const getWeekendDates = async (year) => {
  try {
    const weekends = await prisma.dim_morphe_retail_weekends.findMany({
      where: {
        year: year,
      },
      select: {
        weekend: true,
      },
    });

    return weekends.map((item) => item.weekend.toISOString().split("T")[0]);
  } catch (error) {
    return [];
  }
};

const getWeekendDateIndex = (weekendDates, currentDate) => {
  return weekendDates.indexOf(currentDate);
};

const weeklyCommonTableDataMapping = (
  data,
  totalForecastedData,
  wekendDates
) => {
  const skus = data.map((item) => item.sku);
  const titles = data.map((item) => item.title);
  let uniqueSkus = [...new Set(skus)];
  let uniqueSkusTitle = [...new Set(titles)];
  let counter = uniqueSkus.length <= 50 ? uniqueSkus.length : 50;
  const finalData = [];
  for (let i = 0; i < counter; i++) {
    let topSkusData = Array(52).fill({
      aur: 0,
      retail_sales: 0,
      sku: 0,
      title: 0,
      units_sales: 0,
      weekend: 0,
      total_units_sales: 0,
      total_retail_sales: 0,
    });

    let arr = data.filter(
      (item) =>
        item.sku == uniqueSkus[i] &&
        item.title == uniqueSkusTitle[i] &&
        item.title &&
        uniqueSkus[i]
    );

    for (let j = 0; j < arr.length; j++) {
      let index = getWeekendDateIndex(
        wekendDates,
        arr[j].weekend.split("T")[0]
      );
  
      topSkusData[index] = {
        aur: arr[j].aur,
        retail_sales: arr[j].retail_sales,
        sku: arr[j].sku,
        title: arr[j].title,
        units_sales: arr[j].units_sales,
        weekend: arr[j].weekend,
        total_units_sales: totalForecastedData[j].units_sales,
        total_retail_sales: totalForecastedData[j].retail_sales,
      };
    }

    if (uniqueSkusTitle[i] && topSkusData.length > 0) {
      finalData.push({
        sku: uniqueSkus[i],
        title: uniqueSkusTitle[i],
        data: topSkusData,
      });
    }
  }
  return finalData;
};

const weeklyCommonTableDataMappingForAll = (data, filter) => {
  const skus = data.map((item) => item.sku);
  const titles = data.map((item) => item.title);
  let uniqueSkus = [...new Set(skus)];
  let uniqueSkusTitle = [...new Set(titles)];
  let counter = uniqueSkus.length;
  const finalData = [];
  for (let i = 0; i < counter; i++) {
    let arr = data.filter(
      (item) => item.sku == uniqueSkus[i] && item.title == uniqueSkusTitle[i]
    );
    const revenueObj = {
      SKU: uniqueSkus[i],
      Title: uniqueSkusTitle[i],
      Forecast: "",
    };
    // for (let [key, value] of Object.entries(filter)) {
    //   let jsonKey = `Filter - ${key.replace("filter_",'').replace("_",' ').toLowerCase()
    //   .split(' ')
    //   .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    //   .join(' ')}`;
    //   revenueObj[jsonKey] = value;
    // }

    const revenueSales = arr.map(
      (item, index) =>
        (revenueObj[`${moment(item.weekend).format("YYYY-MM-DD")}`] =
          item.retail_sales)
    );
    revenueObj["Forecast"] = "Revenue";
    finalData.push({
      ...revenueObj,
    });

    const unitSales = arr.map(
      (item, index) =>
        (revenueObj[`${moment(item.weekend).format("YYYY-MM-DD")}`] =
          item.units_sales)
    );
    delete revenueObj["Title"];
    delete revenueObj["SKU"];
    // for (let [key, value] of Object.entries(filter)) {
    //   let jsonKey = `Filter - ${key.replace("filter_",'').replace("_",' ').toLowerCase()
    //   .split(' ')
    //   .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    //   .join(' ')}`;
    //   delete revenueObj[jsonKey];
    // }
    revenueObj["Forecast"] = "Units";
    finalData.push({
      ...revenueObj,
    });

    const aurSales = arr.map(
      (item, index) =>
        (revenueObj[`${moment(item.weekend).format("YYYY-MM-DD")}`] = item.aur)
    );
    delete revenueObj["Title"];
    delete revenueObj["SKU"];
    // for (let [key, value] of Object.entries(filter)) {
    //   let jsonKey = `Filter - ${key.replace("filter_",'').replace("_",' ').toLowerCase()
    //   .split(' ')
    //   .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    //   .join(' ')}`;
    //   delete revenueObj[jsonKey];
    // }
    revenueObj["Forecast"] = "AUR";
    finalData.push({
      ...revenueObj,
    });
  }
  return finalData;
};
// function for returning the where condition query parameters
const whereQueryString = (obj, alias = "fseisbw") => {
  let str2 = "";
  let newnessFlag = false;
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
        if (item[1].length > 1 && !newnessFlag) {
          newnessFlag = true;
          return (str2 += `(YEAR(dp.launch_date) <= YEAR(CURRENT_DATE())
                  OR YEAR(dp.launch_date) > YEAR(CURRENT_DATE())) AND `);
        } else if (item[1].length == 1) {
          if (str == "New") {
            return (str2 += `YEAR(dp.launch_date) >= YEAR(CURRENT_DATE()) AND `);
          } else {
            return (str2 +=
              " YEAR(dp.launch_date) < YEAR(CURRENT_DATE()) AND ");
          }
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
//top 10 skus
export const getFilteredForecastData = async (req, res) => {
  let transaction_db = "morphe_staging";
  delete req.body.filterType;
  try {
    const { filterForecastedYear } = req.params;
    let query = `
                WITH iskus AS (
                  select
                    idfbwm.sku as sku,
                    sum(idfbwm.retail_sales) as retail_sales
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
                        ${whereQueryString(req.body, "idfbwm").replace(
                          /dp/g,
                          "idp"
                        )}
                        AND idp.life_cycle <> 'OBSOLETE'
                        AND idp.life_cycle <> 'disco'
                        )
                  group by 1
                  order by 2 desc
                  limit 50)
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
                  AND YEAR(dfbwm.weekend) = ${filterForecastedYear}
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
    let totalForecastedDataQuery = `select
    dfbwm.weekend as weekend,
    ROUND(sum(dfbwm.units_sales), 0) as units_sales,
    ROUND(sum(dfbwm.retail_sales), 2) as retail_sales
  from
    morphe_staging.demand_forecast_base_weekly_metrics dfbwm
  where
    dfbwm.demand_forecast_run_log_id = (
    select
      id
    from
      morphe_staging.demand_forecast_run_log dfrl
    where
      is_base_forecast = true
    limit 1)
    and dfbwm.sku in (
    select
      dp.SKU
    from
      morphe_staging.dim_products dp
    where
    ${whereQueryString(req.body, "dfbwm").replace(/dp/g, "dp")}
      AND Year(dfbwm.weekend) = ${filterForecastedYear} )
  group by
    1
  order by
    2 desc;`;
    const filteredForecastData = await prisma.$queryRaw(query);
    const totalForecastedData = await prisma.$queryRaw(
      totalForecastedDataQuery
    );
    const weekendDates = await getWeekendDates(filterForecastedYear);
    let parsedWeeklyData = weeklyCommonTableDataMapping(
      filteredForecastData,
      totalForecastedData,
      weekendDates
    );
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
export const downloadAllSkuByMonth = async (req, res) => {
  try {
    let transaction_db = "morphe_staging";
    delete req.body.filterType;
    const { filterForecastedYear } = req.params;
    const query = `
    WITH iskus AS (
      select
        idfbwm.sku as sku,
        sum(idfbwm.retail_sales) as retail_sales
      from
      ${transaction_db}.demand_forecast_base_monthly_metrics idfbwm
      where
        idfbwm.demand_forecast_run_log_id = (
        select
          id
        from
        ${transaction_db}.demand_forecast_run_log dfrl
        where
          is_base_forecast = true
        limit 1)
        and idfbwm.sku in (
        select
          idp.SKU
        from
        ${transaction_db}.dim_products idp
        where
        ${whereQueryString(req.body, "idfbwm").replace(/dp/g, "idp")}
            AND idp.life_cycle <> 'OBSOLETE'
            AND idp.life_cycle <> 'disco'
        )
      group by
        1
      order by
        2 desc )
      SELECT
        dfbwm.sku AS SKU,
        dp.title AS Title,
        dp.brand as Brand, 
        dfbwm.channel as Channel,
        dfbwm.country as Country, 
        dp.ns_category as Category,
        dp.ns_class as Class,
        dp.ns_subclass as Subclass,
        dp.ns_collection as Collection, 
        dp.ns_product_subcollection as Collab, 
        MONTHNAME(dfbwm.monthend) AS Month,
        year(dfbwm.monthend) as Year,
        ROUND(SUM(dfbwm.retail_sales), 0) AS RevenueFcast,
        SUM(dfbwm.units_sales) AS UnitsFcast,
        ROUND((SUM(dfbwm.retail_sales) / SUM(dfbwm.units_sales)), 2) AS AURFcast
      FROM
      ${transaction_db}.demand_forecast_base_monthly_metrics dfbwm,
      ${transaction_db}.dim_products dp
      WHERE
        demand_forecast_run_log_id = (
        select
          id
        from
        ${transaction_db}.demand_forecast_run_log dfrl
        where
          is_base_forecast = true
        limit 1)
        AND dfbwm.sku = dp.SKU
        AND YEAR(dfbwm.monthend) = ${filterForecastedYear}
        AND dfbwm.sku IN (
        select
          sku
        from
          iskus)
      GROUP BY
            dfbwm.sku,
            dfbwm.monthend,
            dfbwm.channel,
            dfbwm.country,
            dfbwm.brand,
            dfbwm.category,
            dfbwm.collection,
            dp.ns_product_subcollection, 
            year(dfbwm.monthend)
      ORDER BY
        dfbwm.sku,
        dfbwm.monthend ; `;
    const filteredForecastData = await prisma.$queryRaw(query);
    res.status(200).json({
      parsedWeeklyData: filteredForecastData,
    });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong in downloadAllSkusData api",
      error: `${error}`,
    });
  }
};
// download all skus data
export const downloadAllSkusData = async (req, res) => {
  let transaction_db = "morphe_staging";
  delete req.body.filterType;
  try {
    const { filterForecastedYear } = req.params;
    let query = `
                WITH iskus AS (
                  select
                    idfbwm.sku as sku,
                    sum(idfbwm.retail_sales) as retail_sales
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
                        ${whereQueryString(req.body, "idfbwm").replace(
                          /dp/g,
                          "idp"
                        )}
                        AND idp.life_cycle <> 'OBSOLETE'
                        AND idp.life_cycle <> 'disco'
                        )
                  group by 1
                  order by 2 desc )
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
                  AND YEAR(dfbwm.weekend) = ${filterForecastedYear}
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
    let parsedWeeklyData = weeklyCommonTableDataMappingForAll(
      filteredForecastData,
      req.body
    );
    res.status(200).json({
      parsedWeeklyData,
    });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong in downloadAllSkusData api",
      error: `${error}`,
    });
  }
};

export const getMasterMetricData = async () => {
  try {
    const masterMetricData = await prisma.metrics_master.findMany({
      select: {
        name: true,
        title: true,
      },
      where: {
        name: {
          in: [
            "retail_sales",
            "retail_sales_build",
            "units_sales",
            "units_sales_build",
            "gm",
            "aur",
            "gm_percent",
            "wos",
            "sell_through",
            "inventory_ins_units",
            "inventory_ins_cost",
            "receipt_units",
            "receipt_cost",
          ],
        },
      },
    });
    return masterMetricData;
  } catch (error) {
    return error;
  }
};

const parseFilteredForecastData = (
  type,
  masterMetricData,
  filteredForecastData
) => {
  let parsedData = [];
  let typeIndex = type == "month" ? 12 : 52;
  let revenueTotal = 0;
  let unitsTotal = 0;
  let quarter1UnitsTotal = 0;
  let quarter1RevenueTotal = 0;
  let quarter2UnitsTotal = 0;
  let quarter2RevenueTotal = 0;
  let quarter3UnitsTotal = 0;
  let quarter3RevenueTotal = 0;
  let quarter4UnitsTotal = 0;
  let quarter4RevenueTotal = 0;

  for (let i = 0; i <= filteredForecastData.length; i++) {
    var obj = {};
    let sum = 0;
    let quarterTotal = 0;
    let indexForAvg = 0;

    if (masterMetricData[i] && filteredForecastData[i]) {
      obj["Metrics Name"] = masterMetricData[i].title;
      obj["Metrics Slug"] = masterMetricData[i].name;
      if (
        obj["Metrics Slug"] == "retail_sales" ||
        obj["Metrics Slug"] == "units_sales" ||
        obj["Metrics Slug"] == "gm" ||
        obj["Metrics Slug"] == "inventory_ins_units" ||
        obj["Metrics Slug"] == "inventory_ins_cost" ||
        obj["Metrics Slug"] == "receipt_units" ||
        obj["Metrics Slug"] == "receipt_cost" ||
        obj["Metrics Slug"] == "aur"
      ) {
        for (let j = 0; j < typeIndex; j++) {
          let index = j + 1;
          obj["w" + index] =
            filteredForecastData[j][`${masterMetricData[i].name}`];
          sum = sum + filteredForecastData[j][`${masterMetricData[i].name}`];
          quarterTotal =
            quarterTotal +
            filteredForecastData[j][`${masterMetricData[i].name}`];
          if (type == "week") {
            if (index == 13) {
              obj["Q1"] = quarterTotal;
              if (obj["Metrics Slug"] == "retail_sales") {
                quarter1RevenueTotal = quarterTotal;
              } else if (obj["Metrics Slug"] == "units_sales") {
                quarter1UnitsTotal = quarterTotal;
              }
              quarterTotal = 0;
            } else if (index == 26) {
              obj["Q2"] = quarterTotal;
              if (obj["Metrics Slug"] == "retail_sales") {
                quarter2RevenueTotal = quarterTotal;
              } else if (obj["Metrics Slug"] == "units_sales") {
                quarter2UnitsTotal = quarterTotal;
              }
              quarterTotal = 0;
            } else if (index == 39) {
              obj["Q3"] = quarterTotal;
              if (obj["Metrics Slug"] == "retail_sales") {
                quarter3RevenueTotal = quarterTotal;
              } else if (obj["Metrics Slug"] == "units_sales") {
                quarter3UnitsTotal = quarterTotal;
              }
              quarterTotal = 0;
            } else if (index == 52) {
              obj["Q4"] = quarterTotal;
              if (obj["Metrics Slug"] == "retail_sales") {
                quarter4RevenueTotal = quarterTotal;
              } else if (obj["Metrics Slug"] == "units_sales") {
                quarter4UnitsTotal = quarterTotal;
              }
              quarterTotal = 0;
            }
          } else {
            if (index == 3) {
              obj["Q1"] = quarterTotal;
              if (obj["Metrics Slug"] == "retail_sales") {
                quarter1RevenueTotal = quarterTotal;
              } else if (obj["Metrics Slug"] == "units_sales") {
                quarter1UnitsTotal = quarterTotal;
              }
              quarterTotal = 0;
            } else if (index == 6) {
              obj["Q2"] = quarterTotal;
              if (obj["Metrics Slug"] == "retail_sales") {
                quarter2RevenueTotal = quarterTotal;
              } else if (obj["Metrics Slug"] == "units_sales") {
                quarter2UnitsTotal = quarterTotal;
              }
              quarterTotal = 0;
            } else if (index == 9) {
              obj["Q3"] = quarterTotal;
              if (obj["Metrics Slug"] == "retail_sales") {
                quarter3RevenueTotal = quarterTotal;
              } else if (obj["Metrics Slug"] == "units_sales") {
                quarter3UnitsTotal = quarterTotal;
              }
              quarterTotal = 0;
            } else if (index == 12) {
              obj["Q4"] = quarterTotal;
              if (obj["Metrics Slug"] == "retail_sales") {
                quarter4RevenueTotal = quarterTotal;
              } else if (obj["Metrics Slug"] == "units_sales") {
                quarter4UnitsTotal = quarterTotal;
              }
              quarterTotal = 0;
            }
          }
          indexForAvg = index;
        }
        if (obj["Metrics Slug"] == "retail_sales") {
          revenueTotal = sum;
        } else if (obj["Metrics Slug"] == "units_sales") {
          unitsTotal = sum;
        }
        obj["yearly_aggregate"] = sum;
      } else if (
        obj["Metrics Slug"] == "retail_sales_build" ||
        obj["Metrics Slug"] == "units_sales_build" ||
        obj["Metrics Slug"] == "gm_percent" ||
        obj["Metrics Slug"] == "sell_through" ||
        obj["Metrics Slug"] == "wos"
      ) {
        for (let j = 0; j < typeIndex; j++) {
          let index = j + 1;
          obj["w" + index] =
            filteredForecastData[j][`${masterMetricData[i].name}`];
          sum = sum + filteredForecastData[j][`${masterMetricData[i].name}`];
          indexForAvg = index;

          quarterTotal =
            quarterTotal +
            filteredForecastData[j][`${masterMetricData[i].name}`];
          if (type == "week") {
            if (index == 13) {
              obj["Q1"] = (quarterTotal / 13).toFixed(2);
              quarterTotal = 0;
            } else if (index == 26) {
              obj["Q2"] = (quarterTotal / 13).toFixed(2);
              quarterTotal = 0;
            } else if (index == 39) {
              obj["Q3"] = (quarterTotal / 13).toFixed(2);
              quarterTotal = 0;
            } else if (index == 52) {
              obj["Q4"] = (quarterTotal / 13).toFixed(2);
              quarterTotal = 0;
            }
          } else {
            if (index == 3) {
              obj["Q1"] = (quarterTotal / 3).toFixed(2);
              quarterTotal = 0;
            } else if (index == 6) {
              obj["Q2"] = (quarterTotal / 3).toFixed(2);
              quarterTotal = 0;
            } else if (index == 9) {
              obj["Q3"] = (quarterTotal / 3).toFixed(2);
              quarterTotal = 0;
            } else if (index == 12) {
              obj["Q4"] = (quarterTotal / 3).toFixed(2);
              quarterTotal = 0;
            }
          }
        }
        obj["yearly_aggregate"] = (sum / indexForAvg).toFixed(2);
      }

      if (obj["Metrics Slug"] == "sell_through") {
        obj["yearly_aggregate"] = obj["Q1"] = obj["Q2"] = obj["Q3"] = obj[
          "Q4"
        ] = "--";
      }
      if (obj["Metrics Slug"] == "aur") {
        obj["yearly_aggregate"] = isNaN(revenueTotal / unitsTotal)
          ? 0
          : (revenueTotal / unitsTotal).toFixed(2);
        obj["Q1"] = isNaN(quarter1RevenueTotal / quarter1UnitsTotal)
          ? 0
          : (quarter1RevenueTotal / quarter1UnitsTotal).toFixed(2);
        obj["Q2"] = isNaN(quarter2RevenueTotal / quarter2UnitsTotal)
          ? 0
          : (quarter2RevenueTotal / quarter2UnitsTotal).toFixed(2);
        obj["Q3"] = isNaN(quarter3RevenueTotal / quarter3UnitsTotal)
          ? 0
          : (quarter3RevenueTotal / quarter3UnitsTotal).toFixed(2);
        obj["Q4"] = isNaN(quarter4RevenueTotal / quarter4UnitsTotal)
          ? 0
          : (quarter4RevenueTotal / quarter4UnitsTotal).toFixed(2);
      }
      parsedData.push(obj);
    }
  }
  return parsedData;
};

const getWeeklyFilteredForecastMetricsQuery = (
  transaction_db,
  regularQuery,
  countryQuery1,
  duration,
  countryQuery,
  year
) => {
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
                  dp.SKU as sku
                from
                  ${transaction_db}.dim_products dp
                where
                  dp.id > 0

                 ${regularQuery}),
                comp_units_revs AS (
                SELECT
                  ${duration}(dfbwm2.weekend)+1 AS cur_date,
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
                    ${countryQuery1}
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
                  dmrw.year = ${year}
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
                      first_weekend)) THEN ROUND( SUM(dfbwm.units_sales) / (select cur.cur_unit_sales from comp_units_revs cur where cur.cur_date  = ${duration}(dfbwm.weekend)), 2)
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
                  ROUND(SUM(dfbwm.receipt_units), 0) AS receipt_units,
                  ROUND(SUM(dfbwm.receipt_cost), 0) AS receipt_cost
                FROM
                  ${transaction_db}.demand_forecast_base_weekly_metrics dfbwm
                WHERE
                  YEAR(dfbwm.weekend)=${year}
                  ${countryQuery}
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

  return query;
};

const getMonthlyFilteredForecastMetricsQuery = (
  transaction_db,
  regularQuery,
  countryQuery1,
  duration,
  countryQuery,
  year
) => {
  let query = `WITH current_base_forecast_run_log_id AS (
    select
      id
    from
      ${transaction_db}.demand_forecast_run_log dfrl
    where
      is_base_forecast = true
    limit 1 ),
    iskus AS (
    select
      dp.SKU as sku
    from
      ${transaction_db}.dim_products dp
    where
      dp.id > 0

     ${regularQuery}),
    comp_units_revs AS (
    SELECT
      ${duration}(dfbwm2.monthend)+1 AS cur_date,
      SUM(dfbwm2.units_sales) as cur_unit_sales,
      SUM(dfbwm2.retail_sales) as cur_retail_sales
    FROM
      ${transaction_db}.demand_forecast_base_monthly_metrics dfbwm2
    WHERE
      dfbwm2.demand_forecast_run_log_id = (
      select
        id
      from
        current_base_forecast_run_log_id)
        ${countryQuery1}
      AND dfbwm2.sku IN (
      select
        sku
      from
        iskus)
    GROUP BY
      ${duration}(dfbwm2.monthend) ),
    first_weekend AS (
    SELECT
    month(dmrw.weekend) as w01
    FROM
      ${transaction_db}.dim_morphe_retail_weekends dmrw
    WHERE
      dmrw.year = ${year}
    LIMIT 1 )
    SELECT
      ${duration}(dfbwm.monthend) AS date,
      ROUND(SUM(dfbwm.retail_sales), 0) AS retail_sales,
      ROUND(SUM(dfbwm.units_sales), 0) AS units_sales,
      (CASE
        WHEN (month(dfbwm.monthend) > (
        select
          w01
        from
          first_weekend)) THEN ROUND( SUM(dfbwm.units_sales) / (select cur.cur_unit_sales from comp_units_revs cur where cur.cur_date  = ${duration}(dfbwm.monthend)), 2)
        ELSE 1
      END) AS units_sales_build,
      (CASE
        WHEN (month(dfbwm.monthend)>(
        select
          w01
        from
          first_weekend)) THEN ROUND( SUM(dfbwm.retail_sales) / (select cur.cur_retail_sales from comp_units_revs cur where cur.cur_date = ${duration}(dfbwm.monthend)), 2)
        ELSE 1
      END) AS retail_sales_build,
      ROUND((ROUND(SUM(dfbwm.retail_sales), 0) / ROUND(SUM(dfbwm.units_sales), 0)), 2) AS aur,
      ROUND(SUM(dfbwm.gm), 0) AS gm,
      ROUND(((ROUND(SUM(dfbwm.gm), 2) / ROUND(SUM(dfbwm.retail_sales), 2))* 100), 2) AS gm_percent,
      ROUND(AVG(dfbwm.wos), 2) AS wos,
      ROUND(((ROUND(SUM(dfbwm.units_sales), 0) / ROUND(SUM(dfbwm.receipt_units), 0))* 100), 2) AS sell_through,
      ROUND(SUM(dfbwm.inventory_ins_units), 0) AS inventory_ins_units,
      ROUND(SUM(dfbwm.inventory_ins_cost), 0) AS inventory_ins_cost,
      ROUND(SUM(dfbwm.receipt_units), 0) AS receipt_units,
      ROUND(SUM(dfbwm.receipt_cost), 0) AS receipt_cost
    FROM
      ${transaction_db}.demand_forecast_base_monthly_metrics dfbwm
    WHERE
      YEAR(dfbwm.monthend)=${year}
      ${countryQuery}
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
      ${duration}(dfbwm.monthend);`;
  return query;
};

export const getFilteredForecastMetrics = async (req, res) => {
  const { filterForecastedYear } = req.params;
  let duration = req.body.filterType;
  delete req.body.filterType;

  let countryQuery;
  let regularQuery;
  let countryQuery1;

  let regularFilter = {};
  let countryFilter = {};
  let countryFilter1 = {};
  for (let item in req.body) {
    if (item !== "filter_sub_channels" && item !== "filter_channels") {
      regularFilter[item] = req.body[item];
    } else {
      countryFilter[item] = req.body[item];
    }
  }
  countryFilter != null
    ? (countryQuery = `AND ${whereQueryString(countryFilter, "dfbwm")}`)
    : (countryQuery = "");
  regularFilter != null
    ? (regularQuery = `AND ${whereQueryString(regularFilter, "dp")}`)
    : (regularQuery = "");
  countryFilter1 != null
    ? (countryQuery1 = `AND ${whereQueryString(countryFilter, "dfbwm2")}`)
    : (countryQuery1 = "");

  if (regularQuery.length == 4) {
    regularQuery = "";
  }
  if (countryQuery.length == 4) {
    countryQuery = "";
  }

  if (countryQuery1.length == 4) {
    countryQuery1 = "";
  }

  try {
    let transaction_db = "morphe_staging";

    let query = "";
    if (duration == "month") {
      query = getMonthlyFilteredForecastMetricsQuery(
        transaction_db,
        regularQuery,
        countryQuery1,
        duration,
        countryQuery,
        filterForecastedYear
      );
    } else {
      query = getWeeklyFilteredForecastMetricsQuery(
        transaction_db,
        regularQuery,
        countryQuery1,
        duration,
        countryQuery,
        filterForecastedYear
      );
    }

    const filteredForecastData = await prisma.$queryRaw(query);
    console.log("filteredForecastData---",query);
    let masterMetricData = await getMasterMetricData();
    let parsedFilteredForecastData = parseFilteredForecastData(
      duration,
      masterMetricData,
      filteredForecastData
    );
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
const typlanQueryGeneratorByDurations = (
  duration,
  whereQueryString,
  transaction_db,
  year
) => {
  let dateOffset;
  let tableName;
  let groubyCol;
  let whereQueryStr = "";
  duration.toLowerCase() == "week"
    ? ((dateOffset = 1),
      (tableName = `planned_weekly_units_revenue_by_channel_by_sku`),
      (groubyCol = "week"))
    : ((dateOffset = 0),
      (tableName = `planned_weekly_units_revenue_by_channel_by_sku`),
      (groubyCol = "month"));
  if (whereQueryString) {
    whereQueryStr = `${whereQueryString.replace(/country/g, "sub_channel")}`;
  }

  const query = `
              SELECT
                ROUND(SUM(pwurbcbs.units), 0) AS total_units,
                ROUND(SUM(pwurbcbs.revenue), 0) AS total_revenue
              FROM
                ${transaction_db}.${tableName} pwurbcbs
              WHERE
                pwurbcbs.channel <> 'Wholesale'
                AND pwurbcbs.plan_year =  ${year}
                AND pwurbcbs.sku in (
                select
                  SKU
                from
                  ${transaction_db}.dim_products dp
                where
                  ${whereQueryStr})
              GROUP BY
              ${duration}(pwurbcbs.weekend_date)`;

  return query;
};

// Planned Query Generator
const typlanChartQueryGeneratorByDurations = (
  duration,
  whereQueryString,
  transaction_db,
  year
) => {
  let dateOffset;
  let tableName;
  let groubyCol;
  let whereQueryStr = "";
  duration.toLowerCase() == "week"
    ? ((dateOffset = 1),
      (tableName = `planned_weekly_units_revenue_by_channel_by_sku`),
      (groubyCol = "week"))
    : ((dateOffset = 0),
      (tableName = `planned_weekly_units_revenue_by_channel_by_sku`),
      (groubyCol = "month"));
  if (whereQueryString) {
    whereQueryStr = `${whereQueryString.replace(/country/g, "sub_channel")}`;
  }

  const query = `
              SELECT
                ROUND(SUM(pwurbcbs.units), 0) AS total_units,
                ROUND(SUM(pwurbcbs.revenue), 0) AS total_revenue
              FROM
                ${transaction_db}.${tableName} pwurbcbs
              WHERE
                pwurbcbs.channel <> 'Wholesale'
                AND pwurbcbs.plan_year = ${year}
                AND pwurbcbs.sku in (
                select
                  SKU
                from
                  ${transaction_db}.dim_products dp
                where
                  ${whereQueryStr})
              GROUP BY
                ${duration}(weekend_date)`;
  return query;
};
// This Year Sale Query Generator
const thisYearSaleYearlyQuarterly = (
  duration,
  whereQueryString,
  transaction_db,
  year
) => {
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
                  YEAR(fseisbw.weekend)= ${year}
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
const forecastQueryGenByDuration = (
  duration,
  whereQueryString,
  transaction_db,
  year
) => {
  // let changeAlias = whereQueryString ? `AND ${whereQueryString}` : "";
  const query = `
              SELECT
                ${duration}(fseisbw.weekend) AS date,
                IFNULL( ROUND(SUM(fseisbw.retail_sales), 2), 0) AS total_revenue,
                IFNULL( ROUND(SUM(fseisbw.units_sales), 0), 0) AS total_units
              FROM
                ${transaction_db}.demand_forecast_base_weekly_metrics fseisbw
              WHERE
                YEAR(fseisbw.weekend)= ${year}
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
  let filter = req.body;
  delete filter.filterType;
  const { filterForecastedYear } = req.params;

  // Planned Sales Yearly
  const filteredPlannedWhereQuery = whereQueryString(filter, "pwurbcbs");
  const filteredPlannedDataQuery = typlanQueryGeneratorByDurations(
    "YEAR",
    filteredPlannedWhereQuery,
    "morphe_staging",
    filterForecastedYear
  );

  // This Year Sale Yearly
  const filteredThisYearSaleWhereQuery = whereQueryString(filter);
  const filteredThisYearSaleDataQuery = thisYearSaleYearlyQuarterly(
    "YEAR",
    filteredThisYearSaleWhereQuery,
    "morphe_staging",
    filterForecastedYear
  );

  // Forecast Yearly
  const filteredForecastWhereQuery = whereQueryString(filter);
  const filteredForecastDataQuery = forecastQueryGenByDuration(
    "YEAR",
    filteredForecastWhereQuery,
    "morphe_staging",
    filterForecastedYear
  );

  try {
    let yearlyFilteredStats = await Promise.allSettled([
      prisma.$queryRaw(filteredPlannedDataQuery),
      prisma.$queryRaw(filteredThisYearSaleDataQuery),
      prisma.$queryRaw(filteredForecastDataQuery),
    ]);

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
  const { filterForecastedYear } = req.params;
  // Planned Quarterly
  const filteredQuarterlyPlannedWhereQuery = whereQueryString(
    filter,
    "pwurbcbs"
  );
  const filteredQuarterlyPlannedDataQuery = typlanQueryGeneratorByDurations(
    "QUARTER",
    filteredQuarterlyPlannedWhereQuery,
    "morphe_staging",
    filterForecastedYear
  );

  // This Year Quarterly
  const filteredQuarterlyThisYearSaleWhereQuery = whereQueryString(filter);
  const filteredQuarterlyThisYearSaleDataQuery = thisYearSaleYearlyQuarterly(
    "QUARTER",
    filteredQuarterlyThisYearSaleWhereQuery,
    "morphe_staging",
    filterForecastedYear
  );

  // Forecast Quarterly
  const filteredQuarterlyForecastWhereQuery = whereQueryString(filter);
  const filteredQuarterlyForecastDataQuery = forecastQueryGenByDuration(
    "QUARTER",
    filteredQuarterlyForecastWhereQuery,
    "morphe_staging",
    filterForecastedYear
  );

  try {
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

// Filtered Chart data
export const getFilterChartData = async (req, res) => {
  delete req.body.filterType;
  let filter = req.body.filters;
  const { filterForecastedYear } = req.params;

  // Planned Quarterly
  const filteredQuarterlyPlannedWhereQuery = whereQueryString(
    filter,
    "pwurbcbs"
  );
  const filteredQuarterlyPlannedDataQuery = typlanChartQueryGeneratorByDurations(
    req.body.duration,
    filteredQuarterlyPlannedWhereQuery,
    "morphe_staging",
    filterForecastedYear
  );

  // This Year Quarterly
  const filteredQuarterlyThisYearSaleWhereQuery = whereQueryString(filter);
  const filteredQuarterlyThisYearSaleDataQuery = thisYearSaleYearlyQuarterly(
    req.body.duration,
    filteredQuarterlyThisYearSaleWhereQuery,
    "morphe_staging",
    filterForecastedYear
  );

  // Forecast Quarterly
  const filteredQuarterlyForecastWhereQuery = whereQueryString(filter);
  const filteredQuarterlyForecastDataQuery = forecastQueryGenByDuration(
    req.body.duration,
    filteredQuarterlyForecastWhereQuery,
    "morphe_staging",
    filterForecastedYear
  );

  try {
    let quarterlyFilteredStats = await Promise.allSettled([
      prisma.$queryRaw(filteredQuarterlyPlannedDataQuery),
      prisma.$queryRaw(filteredQuarterlyThisYearSaleDataQuery),
      prisma.$queryRaw(filteredQuarterlyForecastDataQuery),
    ]);
    res.status(200).json({
      chartData: quarterlyFilteredStats.map((item) => item.value),
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to Fetch Filtered Forecast Data",
      error: `${error}`,
    });
  }
};
// ============================ collection queries ==================================

export const collectionFilteredForecast = async (req, res) => {
  try {
    const { forecast_year } = req.params;
    const collections = await prisma.$queryRaw(`
                                            SELECT
                                          	dfbwm.collection AS collection,
                                          	ROUND(SUM(units_sales),0) AS total_units,
                                          	ROUND(SUM(retail_sales),0) AS total_revenue
                                          FROM
                                          	morphe_staging.demand_forecast_base_weekly_metrics dfbwm,
                                          	morphe_staging.demand_forecast_run_log dfrl
                                          WHERE
                                          	dfrl.is_base_forecast = 1
                                          	AND dfrl.id = dfbwm.demand_forecast_run_log_id
                                          	AND YEAR(dfbwm.weekend) = ${forecast_year}
                                          GROUP BY 1
                                          ORDER BY 3 DESC;`);
    res.status(200).json({
      collections,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

export const collectionFilteredForecastByEcomm = async (req, res) => {
  try {
    const { forecast_year } = req.params;
    const collections = await prisma.$queryRaw(`
                                          SELECT
                                        	dfbwm.collection AS collection,
                                        	ROUND(SUM(units_sales),0) AS total_units,
                                        	ROUND(SUM(retail_sales),0) AS total_revenue
                                        FROM
                                        	morphe_staging.demand_forecast_base_weekly_metrics dfbwm,
                                        	morphe_staging.demand_forecast_run_log dfrl
                                        WHERE
                                        	dfrl.is_base_forecast = 1
                                        	AND dfrl.id = dfbwm.demand_forecast_run_log_id
                                        	AND YEAR(dfbwm.weekend) = ${forecast_year}
                                        	AND dfbwm.channel = 'Ecomm'
                                        GROUP BY 1
                                        ORDER BY 3 DESC;`);
    res.status(200).json({
      collections,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

export const collectionFilteredForecastByRetail = async (req, res) => {
  try {
    const { forecast_year } = req.params;
    const collections = await prisma.$queryRaw(`
                                                SELECT
                                              	dfbwm.collection AS collection,
                                              	ROUND(SUM(units_sales),0) AS total_units,
                                              	ROUND(SUM(retail_sales),0) AS total_revenue
                                              FROM
                                              	morphe_staging.demand_forecast_base_weekly_metrics dfbwm,
                                              	morphe_staging.demand_forecast_run_log dfrl
                                              WHERE
                                              	dfrl.is_base_forecast = 1
                                              	AND dfrl.id = dfbwm.demand_forecast_run_log_id
                                              	AND YEAR(dfbwm.weekend) = ${forecast_year}
                                              	AND dfbwm.channel = 'Retail'
                                              GROUP BY 1
                                              ORDER BY 3 DESC;`);
    res.status(200).json({
      collections,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};
