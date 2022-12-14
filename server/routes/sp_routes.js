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
  getimedSp,
  deleteSp,
  getMoreskilledSp,
  updateSettings,
  getFilteredSubCat,
  getEmployeeCreatedSp,
  getCatSp,
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
router.route("/moreskills").post(getMoreskilledSp);
router.route("/gettimedsp").post(getimedSp);
router.route("/getCatSp").post(getCatSp);

export default router;
