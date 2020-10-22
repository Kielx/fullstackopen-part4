const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 3 },
  url: { type: String, required: true },
  likes: { type: Number, default: 0 },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

blogSchema.set("toObject", { getters: true });
blogSchema.set("toJSON", { getters: true });

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
