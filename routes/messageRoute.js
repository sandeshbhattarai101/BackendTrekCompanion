const { sendMessage, allMessages } = require("../controller/message/messageController");
const isAuthenticated = require("../middleware/isAuthenticated");
const catchAsync = require("../services/catchAsync");

const router = require("express").Router()


 router.route("/api/message").post(isAuthenticated, catchAsync(sendMessage))
 router.route("/api/message/:chatId").get(isAuthenticated, catchAsync(allMessages))


module.exports = router ;