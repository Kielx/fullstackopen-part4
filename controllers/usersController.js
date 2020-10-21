const User = require("../models/User");

module.exports = {
  getUsers: async (req, res, next) => {
    try {
      const UserList = await User.find({});
      return res.status(200).json(UserList);
    } catch (e) {
      /* istanbul ignore next */
      return next(e);
    }
  },
};
