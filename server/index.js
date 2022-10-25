import Express from "express";
import mongoose from "mongoose";
// import cors from "cors";
import {} from "dotenv/config";
import { connectDB } from "./db/connectDb.js";

const PORT = process.env.PORT || 3001;
import sp_route from "./routes/sp_routes.js";
import user_route from "./routes/user_route.js";
const App = Express();
import category_route from "./routes/categoryroute.js";
import subcategory_route from "./routes/subcategoryroute.js";

connectDB();

// App.use(cors())
App.use(Express.json());
App.listen(3001, () => {
  console.log("listening on port " + PORT);
});
App.use("/uploads", Express.static("uploads"));
// App.use("/", (req, res) => {
//   res.send("ok");
// });

App.use("/v1/api/user", user_route);
App.use("/v1/api/sp", sp_route);

App.use("/v1/api/categories", category_route);
App.use("/v1/api/subcategories", subcategory_route);
