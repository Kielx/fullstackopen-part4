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
  //  .get(personController.getSinglePerson)
  .delete(blogController.deleteSingleBlog);
//  .patch(checkPhone, validate, personController.patchSinglePerson); */

router
  .route("/search")
  .get(checkQueryTitle, validate, blogController.findBlogByName);

module.exports = router;
