import mongoose from "mongoose";
const employee = mongoose.Schema({
  employee_contact: {
    type: String,
  },
  employee_limit: {
    type: Number,
  },
  employee_name: {
    type: String,
  },
  employee_status: {
    type: Boolean,
  },
  employee_post: {
    type: String,
  },
  employee_doc: {
    date: { type: String },
    time: { type: String },
  },
});
const employeeSchema = mongoose.model("employees", employee);
export default employeeSchema;
