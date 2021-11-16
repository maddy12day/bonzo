// index.js
import express from "express";
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';

import user from "./routes/user";

import scenario from "./routes/scenario";
import metrics from "./routes/metrics";
import chart from "./routes/chart";
import cache from "./routes/cache";
import bonzoMl from "./routes/bonzo-ml";
import forecast from "./routes/forecast";
import adjustment from "./routes/adjustment";
import timeline from "./routes/timeline";

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'bonzo-api-logger.log'), { flags: 'a' })

const app = express();
app.use(morgan('combined', { stream: accessLogStream }))
app.use(express.json());
// application all errors and info loggers
app.use(user);
app.use(scenario);
app.use(metrics);
app.use(chart);
app.use(cache);
app.use(bonzoMl);
app.use(forecast);
app.use(adjustment);
app.use(timeline);



/**
 * logic for our api will go here
 */
export default {
  path: "/api",
  handler: app,
};
