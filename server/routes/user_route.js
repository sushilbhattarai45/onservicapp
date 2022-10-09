import Express from "express";
import mongoose from "mongoose";
const router = Express.Router();
import {
  uploadImage,
  getAllUser,
  registerUser,
  loginUser,
  getOneUser,
} from "../controller/userController.js";
import { connectDB } from "../db/connectDb.js";
import multer from "multer";
import { v4 as uuid } from "uuid";

// router.route("/").get(connectDB);
router.route("/register").post(registerUser);
// router.route("/register/existance").post(userExistance);
router.route("/login").post(loginUser);
router.route("/getAllUser").post(getAllUser);
router.route("/getOneUser").post(getOneUser);

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, uuid() + file.originalname);
  },
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
});

const upload = multer({ storage: storage });

router.route("/uploadImage").post(upload.single("profile"), uploadImage);
export default router;
