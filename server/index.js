import Express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { connectDB } from "./db/connectDb.js";
const PORT = process.env.port || 3001;

import user_route from "./routes/user_route.js";
const App = Express();
dotenv.config();
connectDB();
App.use(
  Express.json({
    extended: false,
  })
);
App.listen(3001, () => {
  console.log("listening on port " + PORT);
});

App.use("/v1/api/user", user_route);
