import Express from "express";
import mongoose from "mongoose";
const router = Express.Router();
import { check, registerUser } from "../controller/userController.js";
import { connectDB } from "../db/connectDb.js";

router.route("/").get(connectDB);
router.route("/register").get(registerUser);

export default router;
