allRegularFiltersQuery = """SELECT
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
                              	10;"""

allProgramsFiltersQuery = """ 
                            SELECT
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
                                	13;"""
