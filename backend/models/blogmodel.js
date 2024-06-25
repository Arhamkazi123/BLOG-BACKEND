import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    refer: "categories",
  },
  description: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    refer: "users",
  },
});
const blogmodel = new mongoose.model("blogs", blogSchema);
export default blogmodel;
