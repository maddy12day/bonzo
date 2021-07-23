import { PrismaClient } from "@prisma/client";
import moment from "moment";
import { getAllUsers } from "../controller/user";

const prisma = new PrismaClient();

const getUserName = (id, allUsers) => {
  let userName;
  if (allUsers.length > 0) {
    userName = allUsers.filter((user) => user.id == id)[0].first_name;
  } else {
    userName = "";
  }
  return userName;
};

// get user secenarios
export const getUserScenarios = async (req, res) => {
  try {
    const scenarios = await prisma.scenarios.findMany({
      where: {
        demand_planner_user_id: parseInt(req.params.id),
      },
      include: {
        scenario_types: {
          select: {
            scenario_type: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });
    res.status(200).json({
      scenarios,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong in shared scenario list api",
      error: `${error}`,
    });
  }
};
// all shared scenarios
export const allSharedScenarios = async (req, res) => {
  try {
    let scenarios = await prisma.scenarios.findMany({
      where: {
        is_shared: true,
      },
      include: {
        scenario_types: {
          select: {
            scenario_type: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });
    let allUsers = await getAllUsers();
    scenarios = scenarios.map((v) => ({
      ...v,
      sharedBy: getUserName(v.demand_planner_user_id, allUsers),
    }));

    res.status(200).json({
      scenarios,
    });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong in shared scenario list api",
      error: `${error}`,
    });
  }
};
// scenario types like discount, markdown
export const scenarioTypes = async (req, res) => {
  try {
    const scenariosTypes = await prisma.scenario_types.findMany({
      select: {
        scenario_type: true,
        id: true,
      },
    });
    res.status(200).json({
      scenariosTypes,
    });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong in scenario type api",
      error: `${error}`,
    });
  }
};
// create scenario
export const createScenario = async (req, res) => {
  try {
    const scenarioRes = await prisma.scenarios.create({
      data: {
        ...req.body,
        scenario_types: {
          connect: {
            id: req.body.scenario_types,
          },
        },
      },
    });
    const executed_by = await prisma.users.findUnique({
      where: {
        id: req.body.demand_planner_user_id,
      },
    });
    const demandForecastRunlogRes = await prisma.demand_forecast_run_log.create(
      {
        data: {
          is_base_forecast: false,
          demand_planner_user_id: req.body.demand_planner_user_id,
          scenario_id: scenarioRes.id,
          status: "Pending",
          forecast_type: "Scenario",
          executed_by: `${executed_by.first_name} ${executed_by.last_name}`,
        },
      }
    );
    res.status(200).json({
      scenarioRes,
      status: 200,
      message: "created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong in create scenario list api",
      error: `${error}`,
    });
  }
};

// Function Used to Parse the data into El Table Friendly Format
export const parseCategoryUnitComparision = (results) => {
  console.log("results", results);
  const fields = ["Planned Units", "Forecast Units", "Adjusted Units"];
  let parsedData = [];
  const newObject = {};
  const plan = {};
  const forecast = {};
  const adjusted = {};
  for (let result of results) {
    let currWeek = moment(new Date(result.weekend)).week() - 1;
    plan["Comparision"] = "Planned Units";
    forecast["Comparision"] = "Forecast Units";
    adjusted["Comparision"] = "Adjusted Units";
    plan[`W-${currWeek} (${moment(result.weekend).format("MM/DD/YYYY")})`] =
      result.planned_units;
    forecast[`W-${currWeek} (${moment(result.weekend).format("MM/DD/YYYY")})`] =
      result.forecasted_units;
    adjusted[`W-${currWeek} (${moment(result.weekend).format("MM/DD/YYYY")})`] =
      result.adjusted_units;
  }
  parsedData.push({ ...plan }, { ...forecast }, { ...adjusted });
  return parsedData;
};

// Function Used to Parse the data into El Table Friendly Format
export const parseCategorySaleComparision = (results) => {
  let parsedData = [];
  const newObject = {};
  const plan = {};
  const forecast = {};
  const adjusted = {};
  for (let result of results) {
    let currWeek = moment(new Date(result.weekend)).week() - 1;
    plan["Comparision"] = "Planned Revenue";
    forecast["Comparision"] = "Forecast Revenue";
    adjusted["Comparision"] = "Adjusted Revenue";
    plan[`W-${currWeek} (${moment(result.weekend).format("MM/DD/YYYY")})`] =
      result.planned_revenue;
    forecast[`W-${currWeek} (${moment(result.weekend).format("MM/DD/YYYY")})`] =
      result.forecasted_revenue;
    adjusted[`W-${currWeek} (${moment(result.weekend).format("MM/DD/YYYY")})`] =
      result.adjusted_revenue;
  }
  parsedData.push({ ...plan }, { ...forecast }, { ...adjusted });
  return parsedData;
};

// Function Used to Parse the data into El Table Friendly Format
const parseUnitSaleComparision = (results) => {
  const fields = ["Planned Units", "Forecast Units", "Adjusted Units"];
  let parsedData = [];
  for (let field of fields) {
    const newObject = {};

    newObject["Comparision"] = field;
    if (field == "Planned Units") {
      for (let result of results) {
        let currWeek = moment(new Date(result.weekend)).week() - 1;
        newObject[
          `W-${currWeek} (${moment(result.weekend).format("MM/DD/YYYY")})`
        ] = result.planned_units;
        parsedData.push(newObject);
      }
    } else if (field == "Forecast Units") {
      for (let result of results) {
        let currWeek = moment(new Date(result.weekend)).week() - 1;
        newObject[
          `W-${currWeek} (${moment(result.weekend).format("MM/DD/YYYY")})`
        ] = result.forecasted_units;
        parsedData.push(newObject);
      }
    } else {
      for (let result of results) {
        let currWeek = moment(new Date(result.weekend)).week() - 1;
        newObject[
          `W-${currWeek} (${moment(result.weekend).format("MM/DD/YYYY")})`
        ] = result.adjusted_units;
        parsedData.push(newObject);
      }
    }
  }
  parsedData.sort((a, b) => {
    if (a.Comparision == b.Comparision) {
    }
  });
  parsedData = [...new Set(parsedData)];
  return parsedData;
};

// Function Used to Parse the data into El Table Friendly Format
const parseUnitRevenueComparision = (results) => {
  const fields = ["Planned Revenue", "Forecast Revenue", "Adjusted Revenue"];
  let parsedData = [];
  for (let field of fields) {
    const newObject = {};

    newObject["Comparision"] = field;
    if (field == "Planned Revenue") {
      for (let result of results) {
        let currWeek = moment(new Date(result.weekend)).week() - 1;
        newObject[
          `W-${currWeek} (${moment(result.weekend).format("MM/DD/YYYY")})`
        ] = result.planned_revenue;
        parsedData.push(newObject);
      }
    } else if (field == "Forecast Revenue") {
      for (let result of results) {
        let currWeek = moment(new Date(result.weekend)).week() - 1;
        newObject[
          `W-${currWeek} (${moment(result.weekend).format("MM/DD/YYYY")})`
        ] = result.forecasted_revenue;
        parsedData.push(newObject);
      }
    } else {
      for (let result of results) {
        let currWeek = moment(new Date(result.weekend)).week() - 1;
        newObject[
          `W-${currWeek} (${moment(result.weekend).format("MM/DD/YYYY")})`
        ] = result.adjusted_revenue;
        parsedData.push(newObject);
      }
    }
  }
  parsedData.sort((a, b) => {
    if (a.Comparision == b.Comparision) {
    }
  });
  parsedData = [...new Set(parsedData)];
  return parsedData;
};

//API: Scenario Sales Summary of Revenue & Units
export const getScenarioSalesSummary = async (req, res) => {
  try {
    const result = await prisma.$queryRaw(
      `SELECT * from morphe_staging.scenario_influenced_leveled_aggregates WHERE scenario_id = ${req.params.id} AND level = "AGGREGATES";`
    );
    res.status(200).json({
      result,
    });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong in create scenario list api",
      error: `${error}`,
    });
  }
};

//API: Scenario Unit & Sales Comparison
export const getScenarioUnitSalesComparison = async (req, res) => {
  try {
    let result = await prisma.$queryRaw(
      `SELECT * FROM morphe_staging.scenario_influenced_metrics WHERE scenario_id = ${req.params.id};`
    );
    let parsedData = {};
    parsedData["Units"] = parseUnitSaleComparision(result);
    parsedData["Revenue"] = parseUnitRevenueComparision(result);
    res.status(200).json({
      parsedData,
    });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong in create scenario list api",
      error: `${error}`,
    });
  }
};

//API: Scenario Category Total Sales Comparison
export const getScenarioCategorySalesComparison = async (req, res) => {
  try {
    const result = await prisma.$queryRaw(
      `SELECT * from morphe_staging.scenario_influenced_leveled_aggregates WHERE scenario_id = ${req.params.id};`
    );
    res.status(200).json({
      result,
    });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong in create scenario list api",
      error: `${error}`,
    });
  }
};

//API: Scenario Category Unit & Sales Comparison
export const getScenarioCategoryComparison = async (req, res) => {
  try {
    const result = await prisma.$queryRaw(
      `SELECT * from morphe_staging.scenario_influenced_leveled_metrics WHERE scenario_id = ${req.params.id};`
    );
    let parsedData = {};
    parsedData["Units"] = parseCategoryUnitComparision(result);
    parsedData["Revenue"] = parseCategorySaleComparision(result);

    res.status(200).json({
      parsedData,
    });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong in create scenario list api",
      error: `${error}`,
    });
  }
};

// check user created scenarios status
export const checkScenarioStatus = async (req, res) => {
  try {
    const scenario = await prisma.scenarios.findMany({
      where: {
        demand_planner_user_id: parseInt(req.params.id),
      },
      orderBy: {
        created_at: "desc",
      },
      select: {
        status: true,
        id: true,
      },
    });
    res.json({
      scenario: scenario[0],
    });
  } catch (error) {
    res.status(500).json({
      error: `something went wrong in check scenario status api. ${error}`,
    });
  }
};

// share scenarios
export const shareScenario = async (req, res) => {
  try {
    const scenario = await prisma.scenarios.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        is_shared: true,
      },
    });
    res.json({
      scenario,
      message: "scenario shared successfully...",
    });
  } catch (error) {
    res.status(500).json({
      error: `something went wrong shared scenario api. ${error}`,
    });
  }
};
// share scenarios
export const unshareScenario = async (req, res) => {
  try {
    const scenario = await prisma.scenarios.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        is_shared: false,
      },
    });
    res.json({
      scenario,
      message: "scenario unshared successfully...",
    });
  } catch (error) {
    res.status(500).json({
      error: `something went wrong unshared scenario api. ${error}`,
    });
  }
};
// merge scenarios
export const mergeScenarioWithBase = async (req, res) => {
  try {
    const scenario = await prisma.scenarios.update({
      where: {
        id: parseInt(req.body.id),
      },
      data: {
        status: "Merge Pending",
      },
    });
    const executed_by = await prisma.users.findUnique({
      where: {
        id: req.body.demand_planner_user_id,
      },
    });
    const demandForecastRunlogRes = await prisma.demand_forecast_run_log.create(
      {
        data: {
          is_base_forecast: false,
          demand_planner_user_id: req.body.demand_planner_user_id,
          scenario_id: req.body.id,
          status: "Merge Pending",
          forecast_type: "Merge",
          executed_by: `${executed_by.first_name} ${executed_by.last_name}`,
        },
      }
    );
    res.json({
      scenario,
      message: " scenario successfully merged with base...",
    });
  } catch (error) {
    res.status(500).json({
      error: `something went wrong with merge scenario api. ${error}`,
    });
  }
};

// check merge scenario status
export const checkMergeScenarioStatus = async (req, res) => {
  try {
    const scenario = await prisma.scenarios.findMany({
      where: {
        status: "Merge Pending",
      },
      orderBy: {
        created_at: "desc",
      },
    });
    res.json({
      scenario: scenario[0],
    });
  } catch (error) {
    res.status(500).json({
      error: `something went wrong in check merge scenario status api. ${error}`,
    });
  }
};

//  get scenario details by click
export const getScenarioDetailsById = async (req, res) => {
  try {
    const scenario = await prisma.scenarios.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    const scenarioTypes = await prisma.scenario_types.findUnique({
      where: {
        id: scenario.scenario_type_id,
      },
      select: {
        scenario_type: true,
      },
    });
    res.json({
      scenario: {
        ...scenario,
        ...scenarioTypes,
      },
    });
  } catch (error) {
    res.json({
      error: `something went wrong in getScenarioDetailsById ${error}.`,
    });
  }
};

export const activeMergedScenarioAsBase = async (req, res) => {
  try {
    const isPartOfBase = await prisma.scenarios.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        is_part_of_base: true,
      },
    });
    console.log("before run log ");
    const whereIsbaseForecstFalse = await prisma.$queryRaw(
      `update morphe_staging.demand_forecast_run_log set is_base_forecast=false where is_base_forecast= true`
    );
    console.log("before whereIsbaseForecstTrue");
    console.log(
      `update morphe_staging.demand_forecast_run_log set is_base_forecast=true where scenario_id=${parseInt(
        req.params.id
      )} AND forecast_type='Merge' AND status='Merge Completed'`
    );
    const whereIsbaseForecstTrue = await prisma.$queryRaw(
      `update morphe_staging.demand_forecast_run_log set is_base_forecast=true where scenario_id=${parseInt(
        req.params.id
      )} AND forecast_type='Merge' AND status='Merge Completed'`
    );
    console.log("after whereIsbaseForecstTrue");

    res.json({
      isPartOfBase,
    });
  } catch (error) {
    res.json({
      error: `something went activeMergedScenarioAsBase  ${error}.`,
    });
  }
};
