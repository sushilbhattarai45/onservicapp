import Express from "express";
import mongoose from "mongoose";
import {
  postSubCategories,
  updateSubCategory,
  getAllSubCat,
  getFilteredSubCat,
  newAddons,
} from "../controller/subcategoryController.js";
const router = Express.Router();
// router.route("/").get(hello);

router.route("/postsubcategory").post(postSubCategories);
router.route("/updatesubcategory").post(updateSubCategory);
router.route("/getallsubCategory").post(getAllSubCat);
router.route("/getfilteredsubcat").post(getFilteredSubCat);
router.route("/newaddons").post(newAddons);

export default router;
