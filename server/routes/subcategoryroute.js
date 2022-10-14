import Express from "express";
import mongoose from "mongoose";
import {
  postSubCategories,
  updateSubCategory,
  getAllSubCat,
  getFilteredSubCat,
} from "../controller/subcategoryController.js";
const router = Express.Router();
// router.route("/").get(hello);

router.route("/postsubcategory").post(postSubCategories);
router.route("/updatesubcategory").post(updateSubCategory);
router.route("/getallsubCategory").post(getAllSubCat);
router.route("/getfilteredsubcat").post(getFilteredSubCat);

export default router;
