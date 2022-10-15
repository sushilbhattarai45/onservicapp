import mongoose from "mongoose";
const categories = mongoose.Schema({
  category_name: {
    type: String,
  },
  category_status: {
    default: true,
    type: Boolean,
  },
  category_doc: {
    date: { type: String },
    time: { type: String },
  },
  category_dou: {
    date: { type: String },
    time: { type: String },
  },
  category_showonhome: {
    type: Boolean,
  },
  category_photo: {
    type: String,
  },
  category_updatedby: {
    type: String,
    default: "null",
  },
  category_id: {
    type: String,
  },
});
const categorySchema = mongoose.model("categories", categories);
export default categorySchema;
