import memcached from "memcached";
import { PrismaClient } from "@prisma/client";
import MemcachePlus from 'memcache-plus';

const prisma = new PrismaClient();

const memcachedConnection = new memcached("localhost:11211", {
  retries: 10,
  retry: 10000,
  remove: true,
});
const newCache = new MemcachePlus()
export const programFiltersData = async (req, res) => {
  const program1 = await newCache.get("globalProgramDataSet1")
  const program2 = await newCache.get("globalProgramDataSet2")
  const program3 = await newCache.get("globalProgramDataSet3")
  const program4 = await newCache.get("globalProgramDataSet4")
  res.json({
    response: [
      ...program1,
      ...program2,
      ...program3,
      ...program4,
    ]
  });
};
export const regularFiltersData = async (req, res) => {
  const regular1 =  await newCache.get("globalRegularDataSet1");
  const regular2 =  await newCache.get("globalRegularDataSet2");
  const regular3 =  await newCache.get("globalRegularDataSet3");
  const regular4 =  await newCache.get("globalRegularDataSet4");
  const regular5 =  await newCache.get("globalRegularDataSet5");
  const regular6 =  await newCache.get("globalRegularDataSet6");
  const regular7 =  await newCache.get("globalRegularDataSet7");
  const regular8 =  await newCache.get("globalRegularDataSet8");

  res.json({
    response: [
      ...regular1,
      ...regular2,
      ...regular3,
      ...regular4,
      ...regular5,
      ...regular6,
      ...regular7,
      ...regular8
    ]
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
 try {
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
await newCache.set("globalProgramDataSet1", program.slice(0, 1000))
await newCache.set("globalProgramDataSet2", program.slice(1000, 3000))
await newCache.set("globalProgramDataSet3", program.slice(3000, 6000))
await newCache.set("globalProgramDataSet4", program.slice(6000, 9000))

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
await newCache.set("globalRegularDataSet1", regular.slice(0, 1000))
await newCache.set("globalRegularDataSet2", regular.slice(1000, 3000))
await newCache.set("globalRegularDataSet3", regular.slice(3000, 6000))
await newCache.set("globalRegularDataSet4", regular.slice(6000, 9000))
await newCache.set("globalRegularDataSet5", regular.slice(9000, 12000))
await newCache.set("globalRegularDataSet6", regular.slice(12000, 15000))
await newCache.set("globalRegularDataSet7", regular.slice(15000, 18000))
await newCache.set("globalRegularDataSet8", regular.slice(18000, 20000))
res.json({
mess: "set successfully..",
});
 }catch(error) {
  res.json({
    eror: `${error}`
    });
 }
};
