import Express from "express";
import mongoose from "mongoose";
const router = Express.Router();
import {
  uploadImage,
  getAllUser,
  registerUser,
  loginUser,
  getOneUser,
  updateUser,
  forgetPin,
  deleteUser,
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
router.route("/updateUser").post(updateUser);
router.route("/forgetPin").post(forgetPin);
router.route("/deleteuser").post(deleteUser);

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, Date.now() + "." + file.originalname.split(".")[1]);
  },
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
});

const upload = multer({ storage: storage });

router.route("/uploadImage").post(upload.single("profile"), uploadImage);
export default router;
