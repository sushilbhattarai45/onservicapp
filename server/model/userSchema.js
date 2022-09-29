import mongoose, { Mongoose } from "mongoose";

const user = new Mongoose.Schema({
  user_id: {
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
});

const userSchema = mongoose.model("users", user);
export default userSchema;
