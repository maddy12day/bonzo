import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
    const scenarios = await prisma.scenarios.findMany({
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
    const demandForecastRunlogRes = await prisma.demand_forecast_run_log.create({
      data: {
        is_base_forecast: false,
        demand_planner_user_id: req.body.demand_planner_user_id,
        scenario_id: scenarioRes.id,
        status: "Pending",
        forecast_type: "Scenario",
        executed_by: `${executed_by.first_name} ${executed_by.last_name}`,
      },
    });
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
const parseCategoryUnitComparision = (results) => {
  const fields = ["Planned Units", "Adjusted Units", "Forecast Units"];
  let parsedData = [];
  for (let field of fields) {
    let index = 0;
    const newObject = {};

    newObject["Comparision"] = field;
    if (field == "Planned Units") {
      for (let result of results) {
        index++;
        newObject[`W-${index}`] = result.planned_units;
        parsedData.push(newObject);
      }
    } else if (field == "Adjusted Units") {
      for (let result of results) {
        index++;
        newObject[`W-${index}`] = result.adjusted_units;
        parsedData.push(newObject);
      }
    } else {
      for (let result of results) {
        index++;
        newObject[`W-${index}`] = result.forecasted_units;
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
const parseCategorySaleComparision = (results) => {
  const fields = ["Planned Revenue", "Adjusted Revenue", "Forecast Revenue"];
  let parsedData = [];
  for (let field of fields) {
    let index = 0;
    const newObject = {};

    newObject["Comparision"] = field;
    if (field == "Planned Revenue") {
      for (let result of results) {
        index++;
        newObject[`W-${index}`] = result.planned_revenue;
        parsedData.push(newObject);
      }
    } else if (field == "Adjusted Revenue") {
      for (let result of results) {
        index++;
        newObject[`W-${index}`] = result.adjusted_revenue;
        parsedData.push(newObject);
      }
    } else {
      for (let result of results) {
        index++;
        newObject[`W-${index}`] = result.forecasted_revenue;
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
const parseUnitSaleComparision = (results) => {
  const fields = ["Planned Units", "Adjusted Units", "Forecast Units"];
  let parsedData = [];
  for (let field of fields) {
    let index = 0;
    const newObject = {};

    newObject["Comparision"] = field;
    if (field == "Planned Units") {
      for (let result of results) {
        index++;
        newObject[`W-${index}`] = result.planned_units;
        parsedData.push(newObject);
      }
    } else if (field == "Adjusted Units") {
      for (let result of results) {
        index++;
        newObject[`W-${index}`] = result.adjusted_units;
        parsedData.push(newObject);
      }
    } else {
      for (let result of results) {
        index++;
        newObject[`W-${index}`] = result.forecasted_units;
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
  const fields = ["Planned Revenue", "Adjusted Revenue", "Forecast Revenue"];
  let parsedData = [];
  for (let field of fields) {
    let index = 0;
    const newObject = {};

    newObject["Comparision"] = field;
    if (field == "Planned Revenue") {
      for (let result of results) {
        index++;
        newObject[`W-${index}`] = result.planned_revenue;
        parsedData.push(newObject);
      }
    } else if (field == "Adjusted Revenue") {
      for (let result of results) {
        index++;
        newObject[`W-${index}`] = result.adjusted_revenue;
        parsedData.push(newObject);
      }
    } else {
      for (let result of results) {
        index++;
        newObject[`W-${index}`] = result.forecasted_revenue;
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
    let result = await prisma.$queryRaw(`SELECT * FROM morphe_staging.scenario_influenced_metrics WHERE scenario_id = ${req.params.id};`);
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
    const result = await prisma.$queryRaw(`SELECT * from morphe_staging.scenario_influenced_leveled_aggregates WHERE scenario_id = ${req.params.id};`);
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
    const result = await prisma.$queryRaw(`SELECT * from morphe_staging.scenario_influenced_leveled_metrics WHERE scenario_id = ${req.params.id};`);
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
    console.log(req.params);
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
