import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const getGenensisNodeDetails = async (req, res) => {
  try {
    const genensis = await prisma.$queryRaw(`
        select
          dfrl.id as genesis_id,
          dfrl.forecast_completed_at as genesis_time,
          dfrl.executed_by as god_user,
          (
          SELECT
            IFNULL(COUNT(dfrl1.id), 0)
          from
           morphe_staging.demand_forecast_run_log dfrl1,
           morphe_staging.manual_adjustments ma
          where
            dfrl1.ma_source_scenario_id = 0
            and dfrl1.status = 'Completed'
            and ma.id = dfrl1.manual_adjustment_id
            and ma.is_active = true) as adjustment_count
        from
            morphe_staging.demand_forecast_run_log dfrl
        where
          dfrl.is_base_forecast = true`);
    res.status(200).json({
      genensis,
    });
  } catch (error) {
    res.status(200).json({
      error: error,
    });
  }
};
// merge scenario
export const getMergeScenarioTimeLineNodes = async (req, res) => {
  try {
    const mergeScenarios = await prisma.$queryRaw(`
                                                  SELECT 
                                                  s.id,
                                                  s.demand_planner_user_id,
                                                  s.scenario_name,
                                                  s.scenario_type_id,
                                                  s.amount,
                                                  s.is_dollar,
                                                  s.start_date,
                                                  s.end_date,
                                                  s.is_active,
                                                  s.status,
                                                  s.is_shared,
                                                  s.is_part_of_base,
                                                  s.merged_with_base_at,
                                                  s.merged_with_base_id,
                                                  u.first_name, 
                                                  u.last_name,
                                                  st.scenario_type
                                                  from morphe_staging.scenarios s, morphe_staging.users u, morphe_staging.scenario_types st
                                                  where status = 'Merged'  
                                                  and s.demand_planner_user_id = u.id
                                                  and st.id = s.scenario_type_id 
                                                  order by s.merged_with_base_at;`);
    res.json({
      mergeScenarios,
    });
  } catch (error) {
    res.json({
      error: `something went wrong in get merged scenario time line data api ${error}`,
    });
  }
};
