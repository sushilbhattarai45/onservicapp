import mongoose from "mongoose";
const subCategories = mongoose.Schema({
  subCat_name: {
    type: String,
  },
  subCat_hassubCat: {
    default: false,
    type: Boolean,
  },
  subCat_status: {
    default: true,
    type: Boolean,
  },
  subCat_doc: {
    date: { type: String },
    time: { type: String },
  },
  subCat_dou: {
    date: { type: String },
    time: { type: String },
  },
  subCat_photo: {
    type: String,
  },
  subCat_updatedby: {
    type: String,
    default: "null",
  },
  subCat_id: {
    type: String,
  },
  subCat_isSecond: {
    type: Boolean,
    default: false,
  },
  category_id: {
    type: String,
  },
});
const subcategoriesSchema = mongoose.model("subcategories", subCategories);
export default subcategoriesSchema;
