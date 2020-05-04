const userRouter = require("express").Router();
const { sendUsers } = require("../controllers/users.controllers");

userRouter.route("/").get(sendUsers);

module.exports = userRouter;
