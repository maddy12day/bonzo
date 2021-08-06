import memcached from "memcached";
import { PrismaClient } from "@prisma/client";
import cache from 'memory-cache';

const prisma = new PrismaClient();

const memcachedConnection = new memcached("localhost:11211", {
  retries: 10,
  retry: 10000,
  remove: true,
});
const newCache = new cache.Cache();
export const programFiltersData = async (req, res) => {
  res.json({
    response: JSON.parse(newCache.get("globalProgramDataSet")),
  });
};
export const regularFiltersData = async (req, res) => {
  res.json({
    response: JSON.parse(newCache.get("globalRegularDataSet")),
  });
};
export const regularFilterDropdownData = async (req, res) => {
  try {
    memcachedConnection.getMulti(
      [
        "productSource",
        "brandType",
        "lifeCycle",
        "newness",
        "brands",
        "channels",
        "subChannels",
        "categories",
        "collections",
      ],
      (err, data) => {
        res.status(200).send({
          response: {
            productSource: JSON.parse(data.productSource),
            brandType: JSON.parse(data.brandType),
            lifeCycle: JSON.parse(data.lifeCycle),
            newness: JSON.parse(data.newness),
            brands: JSON.parse(data.brands),
            channels: JSON.parse(data.channels),
            subChannels: JSON.parse(data.subChannels),
            categories: JSON.parse(data.categories),
            collections: JSON.parse(data.collections),
          },
        });
      }
    );
  } catch (error) {
    res.status(500).send({
      message: error,
    });
  }
};
export const programFilterDropdownData = async (req, res) => {
  try {
    memcachedConnection.getMulti(
      [
        "programSource",
        "programType",
        "programLifeCycle",
        "programNewness",
        "programbrands",
        "programCollabs",
        "programChannels",
        "programSubChannels",
        "programCategories",
        "programClasses",
        "programSubClasses",
        "programCollections",
      ],
      (err, data) => {
        res.status(200).send({
          response: {
            programSource: JSON.parse(data.programSource),
            programType: JSON.parse(data.programType),
            programLifeCycle: JSON.parse(data.programLifeCycle),
            programNewness: JSON.parse(data.programNewness),
            programbrands: JSON.parse(data.programbrands),
            programCollabs: JSON.parse(data.programCollabs),
            programChannels: JSON.parse(data.programChannels),
            programSubChannels: JSON.parse(data.programSubChannels),
            programCategories: JSON.parse(data.programCategories),
            programClasses: JSON.parse(data.programClasses),
            programSubClasses: JSON.parse(data.programSubClasses),
            programCollections: JSON.parse(data.programCollections),
          },
        });
      }
    );
  } catch (error) {
    res.send(500).send({
      message: error,
    });
  }
};
// display all options for first load without any selection
export const filterAllOptions = async (req, res) => {
  try {
    memcachedConnection.getMulti(
      ["allRegularFilters", "allProgramFilters"],
      (err, data) => {
        res.status(200).send({
          response: {
            regular: JSON.parse(data.allRegularFilters),
            program: JSON.parse(data.allProgramFilters),
          },
        });
      }
    );
  } catch (error) {
    res.status(500).send({
      error: new Error(error),
    });
  }
};

export const setProgramFilterCache = async (req, res) => {
  const program = await prisma.$queryRaw(`SELECT
                                IFNULL(TRIM(dp.product_third_party), 'N/A') AS product_source,
                                IFNULL(TRIM(dp.product_morphe_new_brand_3p), 'N/A') AS brand_type,
                                IFNULL(dp.life_cycle, 'N/A') AS life_cycle,
                                CASE
                                    WHEN YEAR(dp.launch_date) >= YEAR(CURRENT_DATE()) THEN 'New'
                                    ELSE 'Old'
                                END AS newness,
                                IFNULL(dp.brand, 'N/A') AS brand,
                                IFNULL(dp.ns_product_subcollection, 'N/A') AS collab,
                                dfbwm.channel AS channel,
                                dfbwm.country AS sub_channel,
                                IFNULL(dp.ns_category, 'N/A') AS category,
                                IFNULL(dp.ns_class, 'N/A') AS class,
                                IFNULL(dp.ns_subclass, 'N/A') AS sub_class,
                                IFNULL(dp.ns_collection, 'N/A') AS collection,
                                CONCAT(dp.SKU, ': ', dp.title) AS sku
                            FROM
                                morphe_staging.demand_forecast_base_weekly_metrics dfbwm
                            JOIN morphe_staging.demand_forecast_run_log dfrl ON
                                dfrl.id = dfbwm.demand_forecast_run_log_id
                            JOIN morphe_staging.dim_products dp ON
                                dp.SKU = dfbwm.sku
                            WHERE
                                dfrl.is_base_forecast = true
                                AND dp.ns_product_group <> 'MORPHE'
                            GROUP BY
                                1,
                                2,
                                3,
                                4,
                                5,
                                6,
                                7,
                                8,
                                9,
                                10,
                                11,
                                12,
                                13
                            ORDER BY
                                1,
                                2,
                                3,
                                4,
                                5,
                                6,
                                7,
                                8,
                                9,
                                10,
                                11,
                                12,
                                13;`);
  newCache.put("globalProgramDataSet", JSON.stringify(program))
  const regular = await prisma.$queryRaw(`SELECT
                                              IFNULL(TRIM(dp.product_third_party), 'N/A') AS product_source,
                                              IFNULL(TRIM(dp.product_morphe_new_brand_3p), 'N/A') AS brand_type,
                                              IFNULL(dp.life_cycle, 'N/A') AS life_cycle,
                                              CASE
                                                WHEN YEAR(dp.launch_date) >= YEAR(CURRENT_DATE()) THEN 'New'
                                                ELSE 'Old'
                                              END AS newness,
                                              IFNULL(dp.brand, 'N/A') AS brand,
                                              dfbwm.channel AS channel,
                                              dfbwm.country AS sub_channel,
                                              IFNULL(dp.ns_category, 'N/A') AS category,
                                              IFNULL(dp.ns_collection, 'N/A') AS collection,
                                              CONCAT(dp.SKU, ': ', dp.title) AS sku
                                            FROM
                                              morphe_staging.demand_forecast_base_weekly_metrics dfbwm
                                            JOIN morphe_staging.demand_forecast_run_log dfrl ON
                                              dfrl.id = dfbwm.demand_forecast_run_log_id
                                            JOIN morphe_staging.dim_products dp ON
                                              dp.SKU = dfbwm.sku
                                            WHERE
                                              dfrl.is_base_forecast = true
                                            GROUP BY
                                              dp.product_third_party,
                                              dp.product_morphe_new_brand_3p,
                                              dp.life_cycle,
                                              CASE
                                                WHEN YEAR(dp.launch_date) >= YEAR(CURRENT_DATE()) THEN 'New'
                                                ELSE 'Old'
                                              END,
                                              dp.brand,
                                              dfbwm.channel,
                                              dfbwm.country,
                                              dp.ns_category,
                                              dp.ns_collection,
                                              dp.SKU
                                            ORDER BY
                                              1,
                                              2,
                                              3,
                                              4,
                                              5,
                                              6,
                                              7,
                                              8,
                                              9,
                                              10;`);
  newCache.put("globalRegularDataSet", JSON.stringify(regular));
  res.json({
    mess: "set successfully..",
  });
};
