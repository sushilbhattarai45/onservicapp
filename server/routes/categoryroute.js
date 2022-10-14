import Express from "express";
import mongoose from "mongoose";
const router = Express.Router();
import {
  getAllCategories,
  postcategories,
  updateCategory,
} from "../controller/categoriesController.js";
router.route("/").post(getAllCategories);
router.route("/postcategory").post(postcategories);
router.route("/updatecategory").post(updateCategory);

export default router;
