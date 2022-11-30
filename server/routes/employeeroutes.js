import Express from "express";
import {
  deleteAllEmployee,
  deleteOne,
  getAllEmployee,
  getOneEmployee,
  login,
  postEmployee,
  updateEmployee,
} from "../controller/employeeController.js";
const router = Express.Router();
router.route("/post").post(postEmployee);
router.route("/update").post(updateEmployee);
router.route("/getAll").post(getAllEmployee);
router.route("/deleteAll").post(deleteAllEmployee);
router.route("/deleteOne").post(deleteOne);
router.route("/getOne").post(getOneEmployee);
router.route("/login").post(login);

export default router;
