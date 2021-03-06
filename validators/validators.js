const { check, query, validationResult } = require("express-validator");
const errorHandlers = require("../utils/errorHandlers");
const Blog = require("../models/Blog");

module.exports = {
  checkBlogTitle: check("title")
    .trim()
    .not()
    .isEmpty()
    .escape()
    .isLength({ min: 3 })
    .withMessage(
      "Title provided is invalid - it must be at least 3 characters long"
    ),

  checkQueryTitle: query("title")
    .trim()
    .not()
    .isEmpty()
    .escape()
    .withMessage(`query parameter 'title' provided is missing or is invalid`),

  checkIfBlogExists: async (req, res, next) => {
    try {
      const user = await Blog.find({ title: req.body.title });
      if (user.length > 0) {
        throw new errorHandlers.ApiError("Blog already exists", "operational");
      }
      next();
    } catch (e) {
      next(e);
    }
  },

  validate: (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
    throw new errorHandlers.ApiError("Validation failed", extractedErrors);
    // throw extractedErrors;
    /*     return res.status(422).json({
      errors: extractedErrors,
    }); */
  },
};
