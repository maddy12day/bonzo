import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const allSharedScenarios = async (req, res) => {
  try {
    const scenarios = await prisma.scenarios.findMany({
      where: {
        is_shared: true,
      }
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
