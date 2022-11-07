import Express from "express";
import mongoose from "mongoose";
import {
  postBm,
  getBm,
  checkBm,
  deleteBm,
  deleteAllBm,
} from "../controller/bookmarkController.js";
const router = Express.Router();
router.route("/").get((req, res) => {
  res.send("");
});

router.route("/post").post(postBm);
router.route("/get").post(getBm);
router.route("/check").post(checkBm);
router.route("/delete").post(deleteBm);
router.route("/deleteAll").post(deleteAllBm);

export default router;
