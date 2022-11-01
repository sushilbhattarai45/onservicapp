import mongoose from "mongoose";
const bookmark = mongoose.Schema({
  user_id: {
    type: String,
  },
  sp_id: {
    type: String,
  },
  bm_doc: {
    date: { type: String },
    time: { type: String },
  },
});
const bookmarkSchema = mongoose.model("bookmarks", bookmark);
export default bookmarkSchema;
