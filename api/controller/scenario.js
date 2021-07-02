import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
    console.log(demandForecastRunlogRes);
    console.log(scenarioRes);
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
