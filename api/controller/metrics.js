import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getBaseWeeklyMetrics = async (req, res) => {
  try {
    const forecastedWeeklyMetrics = await prisma.forecasted_weekly_metrics.findMany(
      {
        where: {
          demand_forecast_run_log_id: 1,
        },
      }
    );
    const baseWeeklyMetrics = JSON.stringify(
      forecastedWeeklyMetrics,
      (key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
    );
    res.status(200).json({
      baseWeeklyMetrics,
    });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong in weekly metrics api",
      error: `${error}`,
    });
  }
};
