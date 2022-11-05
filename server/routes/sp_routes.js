import Express from "express";
import mongoose from "mongoose";
const router = Express.Router();
import {
  getAllSp,
  getOneSp,
  getSearchedSp,
  postSp,
  test,
} from "../controller/spController.js";
router.route("/").get(test);  
router.route("/postsp").post(postSp);   
router.route("/getAllSp").post(getAllSp);
router.route("/getOneSp").post(getOneSp);
router.route("/getSearchedSp").post(getSearchedSp);

export default router;
