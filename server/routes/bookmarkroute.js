import Express from "express";
import mongoose from "mongoose";
import {
  postBm,
  getBm,
  checkBm,
  deleteBm,
} from "../controller/bookmarkController.js";
const router = Express.Router();
router.route("/post").post(postBm);
router.route("/get").post(getBm);
router.route("/check").post(checkBm);
router.route("/delete").post(deleteBm);

export default router;
