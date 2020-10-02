const Blog = require("../models/Blog");

module.exports = {
  getBlogs: async (req, res, next) => {
    try {
      const BlogList = await Blog.find({});
      res.status(200).json(BlogList);
    } catch (e) {
      return next(e);
    }
  },

  createBlog: async (req, res, next) => {
    try {
      let created = await Blog.create(req.body);
      created = created.toJSON();
      delete created["__v"];
      res.status("200").json(created);
    } catch (e) {
      next(e);
    }
  },
};
