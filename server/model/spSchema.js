import mongoose from "mongoose";

const sp = new mongoose.Schema({
  sp_name: {
    type: String,
  },
  user_id: {
    type: String,
  },
  sp_district: {
    type: String,
  },
  sp_city: {
    type: String,
  },
  sp_location: {
    type: String,
  },
  sp_street: {
    type: String,
  },
  sp_contact: {
    type: String,
  },
  sp_officeNumber: {
    type: String,
  },
  sp_gender: {
    type: String,
  },
  sp_skills: {
    type: Array,
  },
  sp_profileImage: {
    type: String,
  },
  sp_verified: {
    type: Boolean,
    default: false,
  },
  sp_status: {
    type: String,
    default: "ACTIVE",
  },
  sp_media: {
    photo: { type: Array },
    video: { type: String },
  },
  sp_bio: {
    type: String,
    default: "Onservic Service Provider",
  },

  sp_toc: {
    date: { type: String },
    time: { type: String },
  },
});

const spSchema = mongoose.model("sprovider", sp);
export default spSchema;
