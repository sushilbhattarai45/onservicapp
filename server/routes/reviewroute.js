import Express from "express";
import {
  deleteAllReviews,
  getMyReview,
  getOneSpReview,
  postReview,
} from "../controller/reviewController.js";

const router = Express.Router();
router.route("/post").post(postReview);
router.route("/getSpReview").post(getOneSpReview);
router.route("/getMyReview").post(getMyReview);
router.route("/deleteAllReview").post(deleteAllReviews);

export default router;  
