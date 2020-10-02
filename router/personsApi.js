const express = require("express");
const router = express.Router();
const personController = require("../controllers/personController");

const {
  checkUsername,
  validate,
  checkPhone,
  checkIfUserExists,
} = require("../validators/validators");

router
  .route("/")
  .get(personController.getPersons)
  .post(
    [checkUsername, checkPhone],
    validate,
    checkIfUserExists,
    personController.createPerson
  );

router
  .route("/:id")
  .get(personController.getSinglePerson)
  .delete(personController.deleteSinglePerson)
  .patch(checkPhone, validate, personController.patchSinglePerson);

module.exports = router;
