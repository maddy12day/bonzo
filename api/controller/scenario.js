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
    const reqBody = {
      ...req.body,
      scenario_types: {
        connect: {
          id: req.body.scenario_types,
        },
      },
    }
    console.log(reqBody);
    const data = await prisma.scenarios.create({
      data: reqBody
    });
    console.log(data);
    res.status(200).json({
      data,
      message: "created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong in create scenario list api",
      error: `${error}`,
    });
  }
};
