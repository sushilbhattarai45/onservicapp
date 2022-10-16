import Express from "express";
import mongoose from "mongoose";
const router = Express.Router();
import {
  deleteAllCategories,
  deleteOne,
  getAllCategories,
  postcategories,
  updateCategory,
  featuredOnHome,
  newAddons,
} from "../controller/categoriesController.js";
router.route("/").post(getAllCategories);
router.route("/postcategory").post(postcategories);
router.route("/updatecategory").post(updateCategory);
router.route("/deleteallcategories").post(deleteAllCategories);
router.route("/deleteonecategory").post(deleteOne);
router.route("/featuredonhome").post(featuredOnHome);
router.route("/newaddons").post(newAddons);

export default router;
