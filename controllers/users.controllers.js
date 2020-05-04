const { selectUsers } = require("../models/users.models");

exports.sendUsers = (req, res, next) => {
  selectUsers().then((users) => {
    res.send({ users });
  });
};
