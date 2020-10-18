const express = require("express");

const router = express.Router();
const blogController = require("../controllers/blogController");

const {
  checkIfBlogExists,
  checkBlogTitle,
  validate,
  checkQueryTitle,
} = require("../validators/validators");

router
  .route("/")
  .get(blogController.getBlogs)
  .post(checkBlogTitle, validate, checkIfBlogExists, blogController.createBlog);
/*   .post(
    [checkUsername, checkPhone],
    validate,
    checkIfUserExists,
    personController.createPerson
  ); */

router
  .route("/:id")
  .get(blogController.getSingleBlog)
  .delete(blogController.deleteSingleBlog)
  .patch(blogController.patchSingleBlog);

router
  .route("/search")
  .get(checkQueryTitle, validate, blogController.findBlogByName);

module.exports = router;
