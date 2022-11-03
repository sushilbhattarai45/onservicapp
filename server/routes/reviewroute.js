import Express from "express";
import { getOneSpReview, postReview } from "../controller/reviewController.js";

const router = Express.Router();
router.route("/post").post(postReview);
router.route("/getSpReview").post(getOneSpReview);

export default router;
