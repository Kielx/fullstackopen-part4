const Blog = require("../models/Blog");

module.exports = {
  getBlogs: async (req, res, next) => {
    try {
      const BlogList = await Blog.find({});
      return res.status(200).json(BlogList);
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

  deleteSingleBlog: async (req, res, next) => {
    try {
      let foundBlog = await Blog.findByIdAndRemove(req.params.id);
      if (foundBlog === null) {
        res
          .status(404)
          .json({ errorMessage: "User with selected id does not exist" });
        next();
      } else {
        foundBlog = foundBlog.toJSON();
        delete foundBlog["__v"];
        res.status("200").json(foundBlog);
      }
    } catch (e) {
      return next(e);
    }
  },
};
