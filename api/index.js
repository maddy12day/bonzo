// index.js
import express from "express";
import user from "./routes/user";
import scenario from './routes/scenario';

const app = express();

app.use(express.json());
app.use(user);
app.use(scenario);

/**
 * logic for our api will go here
 */
export default {
  path: "/api",
  handler: app,
};
