import Express from "express";
import mongoose from "mongoose";
import {} from "dotenv/config";
import { connectDB } from "./db/connectDb.js";
const PORT = process.env.PORT || 3001;

import user_route from "./routes/user_route.js";
const App = Express();

connectDB();
App.use(Express.json());
App.listen(3001, () => {
  console.log("listening on port " + PORT);
});
App.use("/uploads", Express.static("uploads"));
App.use("/", (req, res) => {
  res.send("ok");
});

App.use("/v1/api/user", user_route);
