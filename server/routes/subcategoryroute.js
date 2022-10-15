import Express from "express";
import mongoose from "mongoose";
import {
  postSubCategories,
  updateSubCategory,
  getAllSubCat,
  getFilteredSubCat,
  newAddons,
  deleteAllSubCategories,
  deleteOne,
} from "../controller/subcategoryController.js";
const router = Express.Router();
// router.route("/").get(hello);

router.route("/postsubcategory").post(postSubCategories);
router.route("/updatesubcategory").post(updateSubCategory);
router.route("/getallsubcategory").post(getAllSubCat);
router.route("/getfilteredsubcat").post(getFilteredSubCat);
router.route("/newaddons").post(newAddons);
router.route("/deleteallsubcategories").post(deleteAllSubCategories);
router.route("/deleteone").post(deleteOne);

export default router;
