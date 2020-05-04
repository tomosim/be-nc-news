const topicRouter = require("express").Router();
const { sendTopics, postTopic } = require("../controllers/topics.controllers");
const { checkTopic } = require("../db/utils/utils");

topicRouter.route("/").get(sendTopics).post(checkTopic, postTopic);

module.exports = topicRouter;
