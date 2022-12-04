import Express from "express";
import mongoose from "mongoose";
const router = Express.Router();
import {
  getAllSp,
  getOneSp,
  getSearchedSp,
  postSp,
  test,
  updateSp,
  deleteSp,
  updateSettings,
  getFilteredSubCat,
  getEmployeeCreatedSp,
} from "../controller/spController.js";
router.route("/").get(test);
router.route("/postsp").post(postSp);
router.route("/getAllSp").post(getAllSp);
router.route("/getOneSp").post(getOneSp);
router.route("/getSearchedSp").post(getSearchedSp);
router.route("/updateSp").post(updateSp);
router.route("/updateSettings").post(updateSettings);
router.route("/filteredsubcat").post(getFilteredSubCat);
router.route("/deletesp").post(deleteSp);
router.route("/spbyemployee").post(getEmployeeCreatedSp);

export default router;
