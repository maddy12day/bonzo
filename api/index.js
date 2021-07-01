// index.js
import express from "express";
import user from "./routes/user";

import scenario from "./routes/scenario";
import metrics from "./routes/metrics";
import chart from "./routes/chart";
<<<<<<< HEAD
import cache from './routes/cache';
=======
import bonzoMl from "./routes/bonzo-ml";
>>>>>>> 615949004b892e79b1fef549ed75b5978291279d

const app = express();

app.use(express.json());
app.use(user);
app.use(scenario);
app.use(metrics);
app.use(chart);
<<<<<<< HEAD
app.use(cache)
=======
app.use(bonzoMl);
>>>>>>> 615949004b892e79b1fef549ed75b5978291279d

/**
 * logic for our api will go here
 */
export default {
  path: "/api",
  handler: app,
};
