import mongoose from "mongoose";

const ads = new mongoose.Schema({
  ads_name: {
    type: String,
  },
  ads_link:{
    type:String
  },
  ads_givenEmail: {
    type: String,
  },
   ads_tag: {
    type: String,
  },
  ads_location: {
    type: String,
  },
  ads_updatedBy: {
    type: String,
  },
  ads_mediaLink: {
    type: String,
  },
  ads_type: {
    type: String,
  },
  ads_status: {
    type: String,
    default: "ACTIVE",
  },
  ads_toc: {
    date: { type: String },
    time: { type: String },
  },
  ads_doe: {
    date: { type: String },
    time: { type: String },
  },
});

const adsSchema = mongoose.model("ads", ads);
export default adsSchema;
