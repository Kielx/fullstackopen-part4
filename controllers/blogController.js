const Blog = require("../models/Blog");

module.exports = {
  getBlogs: async (req, res, next) => {
    try {
      const BlogList = await Blog.find({});
      return res.status(200).json(BlogList);
    } catch (e) {
      /* istanbul ignore next */
      return next(e);
    }
  },

  getSingleBlog: async (req, res, next) => {
    try {
      const foundBlog = await Blog.findById(req.params.id);
      return res.status(200).json(foundBlog);
    } catch (e) {
      /* istanbul ignore next */
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
      /* istanbul ignore next */
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
      } else {
        foundBlog = foundBlog.toJSON();
        delete foundBlog["__v"];
        res.status("200").json(foundBlog);
      }
    } catch (e) {
      /* istanbul ignore next */
      return next(e);
    }
  },

  findBlogByName: async (req, res, next) => {
    const searchRegexp = new RegExp(`^${req.query.title}?$`, "ig");

    try {
      const foundBlog = await Blog.find({ title: searchRegexp });

      if (!foundBlog.length) {
        res
          .status(404)
          .json({ errorMessage: "Blog with such name does not exist" });
      } else {
        res.status("200").json(foundBlog);
      }
    } catch (e) {
      /* istanbul ignore next */
      return next(e);
    }
  },

  patchSingleBlog: async (req, res, next) => {
    try {
      const foundBlog = await Blog.findById(req.params.id);

      if (foundBlog === null) {
        res
          .status(404)
          .json({ errorMessage: "Blog with such name does not exist" });
      } else {
        foundBlog.title = req.body.title;
        foundBlog.author = req.body.author;
        foundBlog.likes = req.body.likes;
        foundBlog.url = req.body.url;
        await foundBlog.save();
        res.status("200").json(foundBlog);
      }
    } catch (e) {
      /* istanbul ignore next */
      return next(e);
    }
  },
};
