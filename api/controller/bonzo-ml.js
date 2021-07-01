import { PrismaClient } from "@prisma/client";
import axios from "axios";

const prisma = new PrismaClient();
const bonzoDsApiUrl = process.env.BONZO_DS_API_URL;
const bonzoDsAuthKey = process.env.BONZO_DS_AUTH_KEY;

export const runBaseForecast = async (req, res) => {
  try {
    //TODO: Get data from request, compose payload for model request and invoke with Axios.
    res.json({
      message: "Success in running base forecast",
      status: true,
    });
  } catch (error) {
    res.json({
      message: "Error running Base Forecast",
      body: error,
      status: false,
    });
  }
};

export const runScenarioForecast = async (req, res) => {
  try {
    //TODO: Get data from request, compose payload for model request and invoke with Axios.
    res.json({
      message: "Success in running scenario forecast",
      status: true,
    });
  } catch (error) {
    res.json({
      message: "Error running Scenario Forecast",
      body: error,
      status: false,
    });
  }
};

export const runScenarioMerge = async (req, res) => {
  try {
    //TODO: Get data from request, compose payload for model request and invoke with Axios.
    res.json({
      message: "Success in running scenario merge",
      status: true,
    });
  } catch (error) {
    res.json({
      message: "Error running Scenario Merge",
      body: error,
      status: false,
    });
  }
};

export const runAdjustmentForecast = async (req, res) => {
  try {
    //TODO: Get data from request, compose payload for model request and invoke with Axios.
    res.json({
      message: "Success in running adjustment forecast",
      status: true,
    });
  } catch (error) {
    res.json({
      message: "Error running Adjustment Forecast",
      body: error,
      status: false,
    });
  }
};
