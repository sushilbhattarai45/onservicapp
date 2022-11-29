import Express from "express";
import mongoose from "mongoose";
import {
  postSubCategories,
  updateSubCategory,
  getAllSubCat,
  getFilteredSubCat,
  deleteAllSubCategories,
  deleteOne,
  secondSubCat,
  postSecond,
  getMixedsubCategories,
} from "../controller/subcategoryController.js";
const router = Express.Router();
// router.route("/").get(hello);

router.route("/postsubcategory").post(postSubCategories);
router.route("/updatesubcategory").post(updateSubCategory);
router.route("/getallsubcategory").post(getAllSubCat);
router.route("/getmixedsubcategory").post(getMixedsubCategories);

router.route("/getfilteredsubcat").post(getFilteredSubCat);
router.route("/deleteallsubcategories").post(deleteAllSubCategories);
router.route("/deleteone").post(deleteOne);
router.route("/getsecond").post(secondSubCat);

router.route("/postsecond").post(postSecond);

export default router;
