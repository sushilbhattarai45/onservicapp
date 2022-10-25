import mongoose from "mongoose";

const user = new mongoose.Schema({
  user_name: {
    type: String,
  },
  user_email: {
    type: String,
  },
  user_district: {
    type: String,
  },
  user_city: {
    type: String,
  },
  user_street: {
    type: String,
  },
  user_contact: {
    type: String,
  },
  user_gender: {
    type: String,
  },
  user_password: {
    type: String,
  },
  user_profileImage: {
    type: String,
  },
  user_status: {
    type: String,
    default: "ACTIVE",
  },
  user_toc: {
    date: { type: String },
    time: { type: String },
  },
});

const userSchema = mongoose.model("users", user);
export default userSchema;
