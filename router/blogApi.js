const express = require("express");

const router = express.Router();
const blogController = require("../controllers/blogController");

/* const {
  checkUsername,
  validate,
  checkPhone,
  checkIfUserExists,
} = require("../validators/validators"); */

router.route("/").get(blogController.getBlogs).post(blogController.createBlog);
/*   .post(
    [checkUsername, checkPhone],
    validate,
    checkIfUserExists,
    personController.createPerson
  ); */

/* router
  .route("/:id")
  .get(personController.getSinglePerson)
  .delete(personController.deleteSinglePerson)
  .patch(checkPhone, validate, personController.patchSinglePerson); */

module.exports = router;
