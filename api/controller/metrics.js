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
export const getBaseMonthlyMetrics = async (req, res) => {
  try {
    const forecastedMonthlyMetrics = await prisma.forecasted_monthly_metrics.findMany(
      {
        where: {
          demand_forecast_run_log_id: 1,
        },
      }
    );
    const baseMonthlyMetrics = JSON.stringify(
      forecastedMonthlyMetrics,
      (key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
    );
    res.status(200).json({
      baseMonthlyMetrics,
    });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong in monthly metrics api",
      error: `${error}`,
    });
  }
};

