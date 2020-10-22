const User = require("../models/User");

module.exports = {
  getUsers: async (req, res, next) => {
    try {
      const UserList = await User.find({}).populate("blogs");

      return res.status(200).json(UserList);
    } catch (e) {
      /* istanbul ignore next */
      return next(e);
    }
  },

  createUser: async (req, res, next) => {
    try {
      let created = await User.create(req.body);
      created = created.toJSON();
      delete created["__v"];
      res.status("200").json(created);
    } catch (e) {
      /* istanbul ignore next */
      next(e);
    }
  },
};
