import Express from "express";
import mongoose from "mongoose";
import {
  postAds,
  deleteAds,
  deleteAllAds,
  updateAds,
  getAds,
} from "../controller/adsController.js";
const router = Express.Router();
router.route("/").get((req, res) => {
  res.send("");
});

router.route("/post").post(postAds);
router.route("/delete").post(deleteAds);
router.route("/deleteAll").post(deleteAllAds);
router.route("/updateAds").post(updateAds);
router.route("/getAds").post(getAds);

export default router;
