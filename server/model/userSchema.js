import mongoose, { Mongoose } from "mongoose";

const user = new Mongoose.Schema({
  user_id: {
    type: String,
  },
  user_prof: {
    type: String,
  },
  user_name: {
    type: String,
  },
  user_email: {
    type: String,
  },
  user_city: {
    type: String,
  },
  user_streetname: {
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
  user_dob: {
    type: String,
  },
  user_toc: {
    date: { type: String },
    time: { type: String },
  },
  user_doc: {
    type: String,
  },
});

const userSchema = mongoose.model("users", user);
export default userSchema;
