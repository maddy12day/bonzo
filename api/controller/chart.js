import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getWeeklyChartData = async (req, res) => {
  try {
    const fact_sales_ending_inventory_sku_by_week = await prisma.fact_sales_ending_inventory_sku_by_week.findMany({
      where: {
        id: 1,
      },
    });
    res.status(200).json({
      fact_sales_ending_inventory_sku_by_week,
    });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong in fact_sales_ending_inventory_sku_by_week api",
      error: `${error}`,
    });
  }
};
