const Person = require("../models/Person");

module.exports = {
  createPerson: async (req, res, next) => {
    try {
      let created = await Person.create({
        name: req.body.name,
        phone: req.body.phone,
      });
      created = created.toJSON();
      delete created["__v"];
      res.status("200").json(created);
    } catch (e) {
      next(e);
    }
  },

  getPersons: async (req, res, next) => {
    try {
      const PersonsList = await Person.find({});
      res.status(200).json(PersonsList);
    } catch (e) {
      return next(e);
    }
  },

  getSinglePerson: async (req, res, next) => {
    try {
      const foundUser = await Person.findById(req.params.id);
      res.json(foundUser);
    } catch (e) {
      res
        .status(404)
        .json({ errorMessage: "User with selected id does not exist" });
      next();
    }
  },

  deleteSinglePerson: async (req, res, next) => {
    try {
      let foundUser = await Person.findByIdAndRemove(req.params.id);
      if (foundUser === null) {
        res
          .status(404)
          .json({ errorMessage: "User with selected id does not exist" });
        next();
      } else {
        foundUser = foundUser.toJSON();
        delete foundUser["__v"];
        res.status("200").json(foundUser);
      }
    } catch (e) {
      return next(e);
    }
  },

  patchSinglePerson: async (req, res, next) => {
    try {
      let modifiedUser = await Person.findByIdAndUpdate(
        req.params.id,
        {
          phone: req.body.phone,
        },
        { new: true }
      );
      res.status("200").json(modifiedUser);
    } catch (e) {
      return next(e);
    }
  },
};
