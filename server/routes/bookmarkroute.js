import Express from "express";
import mongoose from "mongoose";
import { postBm, getBm } from "../controller/bookmarkController.js";
const router = Express.Router();
router.route("/post").post(postBm);
router.route("/get").post(getBm);

export default router;
