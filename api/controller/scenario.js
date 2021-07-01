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
            scenario_type: true
          }
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
            scenario_type: true
          }
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
