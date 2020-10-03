const express = require("express");

const router = express.Router();
const blogController = require("../controllers/blogController");

const { checkIfBlogExists } = require("../validators/validators");

router
  .route("/")
  .get(blogController.getBlogs)
  .post(checkIfBlogExists, blogController.createBlog);
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

module.exports = router;
