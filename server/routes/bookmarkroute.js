import Express from "express";
import mongoose from "mongoose";
import { postBm, getBm, checkBm } from "../controller/bookmarkController.js";
const router = Express.Router();
router.route("/post").post(postBm);
router.route("/get").post(getBm);
router.route("/check").post(checkBm);

export default router;
