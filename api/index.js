// index.js
import express from "express";
import user from "./routes/user";

import scenario from "./routes/scenario";
import metrics from "./routes/metrics";
import chart from "./routes/chart";

const app = express();

app.use(express.json());
app.use(user);
app.use(scenario);
app.use(metrics);
app.use(chart);

/**
 * logic for our api will go here
 */
export default {
  path: "/api",
  handler: app,
};
