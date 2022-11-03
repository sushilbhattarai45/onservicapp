import mongoose from "mongoose";
import Express from "express";
const review = new mongoose.Schema({
  user_contact: {
    type: String,
  },
  sp_contact: {
    type: String,
  },
  review_bio: {
    type: String,
  },
  review_stars: {
    type: Number,
  },
  review_doc: {
    date: { type: String },
    time: { type: String },
  },
});
const ReviewSchema = mongoose.model("reviews", review);
export default ReviewSchema;
