import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// get Base Adjustments
export const getBaseAdjustments = async (req, res) => {
  try {
    const adjustments = await prisma.manual_adjustments.findMany({
      where: {
        filter_level: "baseVersion",
      },
    });
    res.status(200).json({
      adjustments,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong in getBaseAdjustments api.",
      error: `${error}`,
    });
  }
};
